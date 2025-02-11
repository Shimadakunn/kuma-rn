import { alchemy, AlchemySmartAccountClient, sepolia } from '@account-kit/infra';
import { User } from '@account-kit/signer';
import { createLightAccountAlchemyClient } from '@account-kit/smart-contracts';
import { EXPO_PUBLIC_API_KEY } from '@env';
import { router } from 'expo-router';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { AppLoadingIndicator } from '~/src/components/app-loading';
import { signer } from '~/src/utils/signer';
import {
  getPersistedAuthState,
  getPersistedUser,
  persistAuthState,
  persistUser,
} from '~/src/utils/storage';
import { AlchemyAuthSessionContextType, AuthenticatingState } from './types';

const AlchemyAuthSessionContext = createContext<AlchemyAuthSessionContextType>(null!);

export const AlchemyAuthSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => getPersistedUser());
  const [authState, setAuthState] = useState<AuthenticatingState | null>(() => {
    const state = getPersistedAuthState();
    return state ? (state as AuthenticatingState) : null;
  });
  const [isAuthDetailsLoading, setAuthDetailsLoading] = useState<boolean>(false);
  const [isSendingUserOperation, setIsSendingUserOperation] = useState<boolean>(false);
  const [lightAccountClient, setLightAccountClient] = useState<AlchemySmartAccountClient | null>(
    null
  );

  useEffect(() => {
    console.log('Auth State: ', authState);
    persistAuthState(authState);

    if (isAuthDetailsLoading) return;

    if (authState === AuthenticatingState.AUTHENTICATED) {
      router.navigate('/home');
      console.log('Auth State: AUTHENTICATED');
    } else if (authState === AuthenticatingState.UNAUTHENTICATED || !authState) {
      router.navigate('/login');
      console.log('Auth State: UNAUTHENTICATED');
    }
  }, [authState, isAuthDetailsLoading]);

  useEffect(() => {
    persistUser(user);
  }, [user]);

  useEffect(() => {
    if (!user) {
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
      } catch (e) {
        console.error('Unable to verify otp. Check logs for more details: ', e);
        setAuthState(AuthenticatingState.UNAUTHENTICATED);
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

  const sendUserOperation = useCallback(async () => {
    if (!lightAccountClient) return;
    try {
      setIsSendingUserOperation(true);
      const { hash } = await lightAccountClient.sendUserOperation({
        uo: [
          {
            target: '0xTARGET_ADDRESS_1',
            data: '0x',
            value: 0n,
          },
        ],
        account: lightAccountClient.account,
      });
      console.log('User operation sent', hash);
    } catch (error) {
      console.error('Error sending user operation', error);
    } finally {
      setIsSendingUserOperation(false);
    }
  }, [lightAccountClient]);

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
        isSendingUserOperation,
        sendUserOperation,
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
