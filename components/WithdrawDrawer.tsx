import { router } from 'expo-router';
import { ChevronRight, ScanLine } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from './ui/button';
import Drawer from './ui/drawer';

export default function WithdrawDrawer({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const [number, setNumber] = useState(0);
  return (
    <Drawer isVisible={isVisible} onClose={onClose} isBlack>
      <Header />
      <NumberDisplay number={number} />
      <NumPad setNumber={setNumber} />
      <Actions />
    </Drawer>
  );
}

const Header = () => {
  return (
    <View className="w-full flex-row items-center justify-between">
      <Text className="pl-2 font-sans-extrabold text-3xl text-white/80">Withdraw</Text>
      <Button
        onPress={() => {
          router.push('/settings');
        }}
        noShadow
        className="bg-white/90 p-2">
        <ScanLine size={20} color="black" strokeWidth={2.5} />
      </Button>
    </View>
  );
};

const NumberDisplay = ({ number }: { number: number }) => {
  const formattedNumber = number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <View className="my-8 w-full flex-1 items-center justify-center">
      <View className="flex-row items-center">
        <Text className="font-sans-extrabold text-5xl text-white">$</Text>
        <Text className="ml-2 font-sans-extrabold text-5xl text-white">{formattedNumber}</Text>
      </View>
    </View>
  );
};

const NumPad = ({ setNumber }: { setNumber: React.Dispatch<React.SetStateAction<number>> }) => {
  const [pressedButton, setPressedButton] = useState<number | string | null>(null);

  const handleNumberPress = (digit: number) => {
    setPressedButton(digit);
    setTimeout(() => setPressedButton(null), 200);
    setNumber((prev: number) => {
      const newValue = prev * 10 + digit;
      return newValue > 999999.99 ? prev : newValue;
    });
  };

  const handleDecimalPress = () => {
    setPressedButton('.');
    setTimeout(() => setPressedButton(null), 200);
    // Implementation for decimal functionality can be added here
  };

  const handleDeletePress = () => {
    setPressedButton('←');
    setTimeout(() => setPressedButton(null), 200);
    setNumber((prev: number) => Math.floor(prev / 10));
  };

  const NumberButton = ({ value }: { value: number | string }) => (
    <Button
      onPress={() => {
        if (typeof value === 'number') handleNumberPress(value);
        else if (value === '.') handleDecimalPress();
        else if (value === '←') handleDeletePress();
      }}
      animateBackground
      pressedBackgroundOpacity={0.4}
      className="my-1 aspect-square h-24">
      <Text className="font-sans-bold text-4xl text-white">{value}</Text>
    </Button>
  );

  const buttonRows = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['.', 0, '←'],
  ];

  return (
    <View className="w-full items-center justify-center">
      {buttonRows.map((row, rowIndex) => (
        <View key={rowIndex} className="w-full flex-row justify-around">
          {row.map((value) => (
            <NumberButton key={value} value={value} />
          ))}
        </View>
      ))}
    </View>
  );
};

const Actions = () => {
  return (
    <View className="w-full flex-row items-center justify-end py-4">
      <Button
        onPress={() => {
          router.push('/login');
        }}
        isWhite
        className="h-14 w-[35vw]">
        <Text className="font-sans-extrabold text-lg">Deposit</Text>
        <ChevronRight size={24} color="black" />
      </Button>
    </View>
  );
};
