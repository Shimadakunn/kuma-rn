import { Text, View } from 'react-native';

export default function Stats() {
  return (
    <View className="flex w-full flex-col items-start justify-between gap-2 px-4">
      <Text className="font-sans-bold ml-2 text-lg">Statistics</Text>
      <View className="flex w-full flex-row items-center justify-around gap-4">
        <View className="relative h-32 flex-1 items-center justify-center rounded-2xl bg-white">
          <Text className="font-sans-black text-4xl">8%</Text>
          <Text className="font-sans-medium absolute left-4 top-3 text-sm text-gray-500">Apy</Text>
        </View>
        <View className="relative h-32 flex-1 items-center justify-center rounded-2xl bg-white">
          <Text className="font-sans-black text-4xl">$543</Text>
          <Text className="font-sans-medium absolute left-4 top-3 text-sm text-gray-500">
            Profit
          </Text>
        </View>
      </View>
    </View>
  );
}
