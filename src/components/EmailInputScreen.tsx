import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { Button } from './ui/button';

interface EmailInputScreenProps {
  email: string;
  setEmail: (value: string) => void;
  inputRef: React.RefObject<TextInput>;
  onLogin: () => void;
  isEmailValid: boolean;
}

export const EmailInputScreen: React.FC<EmailInputScreenProps> = ({
  email,
  setEmail,
  inputRef,
  onLogin,
  isEmailValid,
}) => {
  return (
    <View className="flex-1">
      <Header />
      <EmailInput email={email} setEmail={setEmail} inputRef={inputRef} />
      <View className="flex-1" />
      <Actions isValid={isEmailValid} onPress={onLogin} buttonText="Login" />
    </View>
  );
};

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

const Actions = ({
  isValid,
  onPress,
  buttonText,
}: {
  isValid: boolean;
  onPress: () => void;
  buttonText: string;
}) => {
  return (
    <View className="w-full flex-row items-center justify-between py-4">
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
