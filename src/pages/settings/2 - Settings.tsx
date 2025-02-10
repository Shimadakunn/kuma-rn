import { router } from 'expo-router';
import { BadgeDollarSign, ChevronRight } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { useAlchemyAuthSession } from '~/src/context/AlchemyAuthSessionProvider';

export default function Settings() {
  const { lightAccountClient } = useAlchemyAuthSession();

  return (
    <View className="w-full flex-1  px-4">
      <View className="w-full gap-2 rounded-xl bg-white p-4">
        <View className="w-full flex-row items-center justify-between ">
          <View className="flex-row items-center gap-1">
            <BadgeDollarSign size={20} color="#000" />
            <Text className="font-sans-semibold text-lg">Currency</Text>
            <Text className="font-sans-semibold text-lg">
              {lightAccountClient?.chain?.nativeCurrency.symbol}
              {lightAccountClient?.account?.address}
            </Text>
          </View>
          <ChevronRight size={20} color="gray" />
        </View>
        <View className="w-full flex-row items-center justify-between ">
          <View className="flex-row items-center gap-1">
            <BadgeDollarSign size={20} color="#000" />
            <Text className="font-sans-semibold text-lg">Currency</Text>
          </View>
          <ChevronRight size={20} color="gray" />
        </View>
      </View>

      <Pressable
        className="w-full items-center justify-center rounded-xl bg-red-400 p-3"
        onPress={() => {
          router.push('/login');
        }}>
        <Text className="font-sans-extrabold text-white">Log Out</Text>
      </Pressable>
    </View>
  );
}
