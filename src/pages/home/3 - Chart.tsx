import * as haptics from 'expo-haptics';
import { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';

const data = [
  {
    timestamp: 1625945400000,
    value: 33575.25,
  },
  {
    timestamp: 1625946300000,
    value: 33545.25,
  },
  {
    timestamp: 1625947200000,
    value: 33510.25,
  },
  {
    timestamp: 1625948100000,
    value: 33215.25,
  },
];

interface TimeFrameSelectorProps {
  timeFrame: string;
  onTimeFrameChange: (timeFrame: string) => void;
}

export default function Chart() {
  const [timeFrame, setTimeFrame] = useState('1h');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  function invokeHaptic() {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Heavy);
  }

  const onCurrentIndexChange = useCallback((index: number) => {
    setCurrentIndex(index);
    setDragging(true);
    console.log('Dragging:', dragging);
    invokeHaptic();
  }, []);

  return (
    <View className="w-full">
      <TimeFrameSelector timeFrame={timeFrame} onTimeFrameChange={setTimeFrame} />
      <LineChart.Provider data={data} onCurrentIndexChange={onCurrentIndexChange}>
        <LineChart width={375} height={200} className="">
          <LineChart.Path color="black">
            <LineChart.Dot color="black" at={3} hasPulse />
          </LineChart.Path>
          <LineChart.CursorCrosshair
            color="black"
            onActivated={invokeHaptic}
            onEnded={() => {
              console.log('Dragging:', dragging);
              setDragging(false);
              invokeHaptic();
            }}
          />
          <LineChart.CursorLine color="black" />
        </LineChart>
      </LineChart.Provider>
    </View>
  );
}

function TimeFrameSelector({ timeFrame, onTimeFrameChange }: TimeFrameSelectorProps) {
  const timeFrames = ['1h', '1d', '1w', '1m', '1y'];

  return (
    <View className="mx-auto flex w-[70%] flex-row justify-between">
      {timeFrames.map((frame) => (
        <TouchableOpacity key={frame} onPress={() => onTimeFrameChange(frame)} className="p-2">
          <Text
            className={`${timeFrame === frame ? 'text-black' : 'text-gray-500'} font-sans-bold `}>
            {frame.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
