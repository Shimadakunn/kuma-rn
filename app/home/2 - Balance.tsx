import { Text, View } from 'react-native';

export default function Balance() {
  return (
    <View className="w-full items-start justify-center px-8 py-4">
      <Text className="mb-2 font-sans-bold text-lg text-gray-400">Balance</Text>
      <Text className="font-sans-extrabold text-4xl tracking-[0.05em]">5 7548.45$</Text>
      <Text className="font-sans-bold text-sm text-green-400/80">▲ 12.45%</Text>
    </View>
  );
}
