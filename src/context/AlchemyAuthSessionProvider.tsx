import { alchemy, AlchemySmartAccountClient, sepolia } from '@account-kit/infra';
import { User } from '@account-kit/signer';
import { createLightAccountAlchemyClient } from '@account-kit/smart-contracts';
import { EXPO_PUBLIC_API_KEY } from '@env';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { AppLoadingIndicator } from '../components/app-loading';
import { signer } from '../utils/signer';
import { AlchemyAuthSessionContextType, AuthenticatingState } from './types';

const AlchemyAuthSessionContext = createContext<AlchemyAuthSessionContextType>(null!);

export const AlchemyAuthSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authState, setAuthState] = useState<AuthenticatingState | null>(null);
  const [isAuthDetailsLoading, setAuthDetailsLoading] = useState<boolean>(false);

  const [lightAccountClient, setLightAccountClient] = useState<AlchemySmartAccountClient | null>(
    null
  );

  useEffect(() => {
    if (!user) {
      console.log('API Key:', EXPO_PUBLIC_API_KEY);
      signer
        .getAuthDetails()
        .then((user) => {
          setUser(user);
          setAuthState(AuthenticatingState.AUTHENTICATED);
          console.log('Auth State: AUTHENTICATED');
        })
        .catch((e) => {
          // User is unauthenticated
          setAuthState(AuthenticatingState.UNAUTHENTICATED);
          console.log('Auth State: UNAUTHENTICATED');
        });
    }

    // IF User is available, we can create a light account client
    if (!lightAccountClient && user) {
      createLightAccountAlchemyClient({
        signer,
        chain: sepolia,
        transport: alchemy({
          apiKey: EXPO_PUBLIC_API_KEY ?? '',
        }),
      }).then((client) => {
        setLightAccountClient(client);
      });
    }
  }, [user, lightAccountClient]);

  const verifyUserOTP = useCallback(
    async (otpCode: string) => {
      setAuthDetailsLoading(true);
      try {
        const user = await signer.authenticate({
          otpCode,
          type: 'otp',
        });

        setUser(user);
        setAuthState(AuthenticatingState.AUTHENTICATED);
        console.log('Auth State: AUTHENTICATED');
      } catch (e) {
        console.error('Unable to verify otp. Check logs for more details: ', e);
        setAuthState(AuthenticatingState.UNAUTHENTICATED);
        console.log('Auth State: UNAUTHENTICATED');
      } finally {
        setAuthDetailsLoading(false);
      }
    },
    [user]
  );

  const signInWithOTP = useCallback((email: string) => {
    // Note that this would only be resolved AFTER the user has
    // Verified thier OTP code. No need to 'await'
    setAuthState(AuthenticatingState.AWAITING_OTP);

    return signer
      .authenticate({
        email,
        type: 'email',
        emailMode: 'otp',
      })
      .catch((e) => {
        setAuthState(AuthenticatingState.UNAUTHENTICATED);
        throw new Error(e);
      });
  }, []);

  const signOutUser = useCallback(async () => {
    await signer.disconnect();
    setUser(null);
    setAuthState(AuthenticatingState.UNAUTHENTICATED);
  }, []);

  return (
    <AlchemyAuthSessionContext.Provider
      value={{
        user,
        authState,
        signOutUser,
        signInWithOTP,
        verifyUserOTP,
        lightAccountClient,
        loading: isAuthDetailsLoading,
      }}>
      {isAuthDetailsLoading && <AppLoadingIndicator />}
      {children}
    </AlchemyAuthSessionContext.Provider>
  );
};

export const useAlchemyAuthSession = () => {
  const val = useContext(AlchemyAuthSessionContext);

  if (!val) {
    throw new Error("This hook can't be used outside the AlchemyAuthSessionProvider.");
  }

  return val;
};
