import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TextInput } from 'react-native';

import { EmailInputScreen } from './EmailInputScreen';
import { OtpInputScreen } from './OtpInputScreen';
import Drawer from './ui/drawer';

import { useAlchemyAuthSession } from '~/src/context/AlchemyAuthSessionProvider';
import { AuthenticatingState } from '~/src/context/types';

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function LoginDrawer({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otp, setOtp] = useState<string>('');
  const router = useRouter();

  const inputRef = useRef<TextInput>(null);
  const { signInWithOTP, authState, verifyUserOTP } = useAlchemyAuthSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (isVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      Keyboard.dismiss();
      // Reset states when drawer closes
      setIsOtpStep(false);
      setOtp('');
      setEmail('');
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isMounted || !isVisible) return;

    if (authState === AuthenticatingState.AWAITING_OTP) {
      setIsOtpStep(true);
    }
  }, [authState, isMounted, isVisible]);

  const handleLogin = useCallback(async () => {
    try {
      await signInWithOTP(email.toLowerCase());
    } catch (e) {
      console.error('Unable to send OTP to user. Ensure your credentials are properly set: ', e);
    }
  }, [email, signInWithOTP]);

  const handleVerifyOtp = useCallback(async () => {
    await verifyUserOTP(otp);
    onClose();
    router.navigate('/home');
  }, [otp, verifyUserOTP, onClose, router]);

  const isEmailValid = isValidEmail(email);

  return (
    <Drawer isVisible={isVisible} onClose={onClose} isBlack>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        {isOtpStep ? (
          <OtpInputScreen
            otp={otp}
            setOtp={setOtp}
            onVerify={handleVerifyOtp}
            onBack={() => setIsOtpStep(false)}
          />
        ) : (
          <EmailInputScreen
            email={email}
            setEmail={setEmail}
            inputRef={inputRef}
            onLogin={handleLogin}
            isEmailValid={isEmailValid}
          />
        )}
      </KeyboardAvoidingView>
    </Drawer>
  );
}
