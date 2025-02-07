import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Button } from './ui/button';
import Drawer from './ui/drawer';
import { NumPad } from './ui/numpad';

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
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      Keyboard.dismiss();
      // Reset states when drawer closes
      setIsOtpStep(false);
      setOtp('');
    }
  }, [isVisible]);

  const handleLogin = async () => {
    // TODO: Implement login logic here
    setIsOtpStep(true);
  };

  const handleVerifyOtp = async () => {
    // TODO: Implement OTP verification logic here
  };

  const isEmailValid = isValidEmail(email);

  if (isOtpStep) {
    return (
      <Drawer isVisible={isVisible} onClose={onClose} isBlack>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <View className="flex-1">
            <OtpHeader />
            <NumberDisplay number={otp} />
            <NumPad setNumber={setOtp} allowDecimals={false} maxValue={999999} isOtpMode />
            <Actions
              isValid={otp.length === 6}
              onPress={handleVerifyOtp}
              buttonText="Verify"
              isOtpStep={isOtpStep}
              onBack={() => setIsOtpStep(false)}
            />
          </View>
        </KeyboardAvoidingView>
      </Drawer>
    );
  }

  return (
    <Drawer isVisible={isVisible} onClose={onClose} isBlack>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <View className="flex-1">
          <Header />
          <EmailInput email={email} setEmail={setEmail} inputRef={inputRef} />
          <View className="flex-1" />
          <Actions isValid={isEmailValid} onPress={handleLogin} buttonText="Login" />
        </View>
      </KeyboardAvoidingView>
    </Drawer>
  );
}

const Header = () => {
  return (
    <View className="w-full flex-row items-center justify-between">
      <Text className="pl-2 font-sans-extrabold text-3xl text-white">What is your mail?</Text>
    </View>
  );
};

const EmailInput = ({
  email,
  setEmail,
  inputRef,
}: {
  email: string;
  setEmail: (value: string) => void;
  inputRef: React.RefObject<TextInput>;
}) => {
  return (
    <View className="w-full px-2 py-8">
      <TextInput
        ref={inputRef}
        value={email}
        onChangeText={setEmail}
        placeholder="johndoe@gmail.com"
        placeholderTextColor="rgba(255, 255, 255, 0.3)"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        cursorColor="white"
        selectionColor="white"
        textAlignVertical="center"
        className="h-12 bg-transparent px-2 font-sans-bold text-xl text-white"
      />
    </View>
  );
};

const OtpHeader = () => {
  return (
    <View className="w-full flex-row items-center justify-between">
      <Text className="pl-2 font-sans-extrabold text-3xl text-white">Enter OTP</Text>
    </View>
  );
};

const NumberDisplay = ({ number }: { number: string }) => {
  const currentPosition = number.length;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };

    pulse();
  }, []);

  return (
    <View className="my-8 flex w-full flex-1 flex-row items-center justify-center space-x-6">
      {Array.from({ length: 6 }).map((_, index) => {
        const isCurrent = index === currentPosition;
        const digit = index < number.length ? number[index] : '';

        return (
          <View key={index} className="h-12 w-12 items-center justify-center">
            {digit ? (
              <View className="flex-row items-center justify-center">
                <Text className="font-sans-bold text-5xl text-white">{digit}</Text>
                {isCurrent && (
                  <Animated.View
                    className="absolute h-6 w-[2px] bg-white"
                    style={{
                      opacity: fadeAnim,
                    }}
                  />
                )}
              </View>
            ) : (
              <View className={`h-6 w-6 rounded-full ${isCurrent ? 'bg-white' : 'bg-white/30'}`} />
            )}
          </View>
        );
      })}
    </View>
  );
};

const Actions = ({
  isValid,
  onPress,
  buttonText,
  isOtpStep,
  onBack,
}: {
  isValid: boolean;
  onPress: () => void;
  buttonText: string;
  isOtpStep?: boolean;
  onBack?: () => void;
}) => {
  return (
    <View className="w-full flex-row items-center justify-between py-4">
      {isOtpStep && onBack && (
        <Button onPress={onBack} noShadow className="aspect-square h-14 bg-slate-600/40">
          <ChevronLeft size={24} color="white" />
        </Button>
      )}
      <View className="flex-1" />
      <Button
        onPress={onPress}
        isWhite
        disabled={!isValid}
        className={`h-14 w-[35vw] ${!isValid ? 'opacity-50' : ''}`}>
        <Text className="font-sans-extrabold text-lg">{buttonText}</Text>
        <ChevronRight size={24} color="black" />
      </Button>
    </View>
  );
};
