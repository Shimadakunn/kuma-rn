import { useRef, useState } from 'react';
import { Animated, Pressable } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  className?: string;
  noShadow?: boolean;
  isWhite?: boolean;
}

export function Button({
  children,
  onPress,
  className,
  noShadow = false,
  isWhite = false,
}: ButtonProps) {
  const translate = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [isPressed, setIsPressed] = useState(false);

  const animatePress = (pressed: boolean) => {
    setIsPressed(pressed);
    Animated.parallel([
      Animated.spring(scale, {
        toValue: pressed ? 0.98 : 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Pressable
      onPressIn={() => animatePress(true)}
      onPressOut={() => animatePress(false)}
      onPress={onPress}>
      <Animated.View
        className={`h-14 flex-row items-center justify-around rounded-2xl ${isWhite ? 'bg-white text-black' : 'bg-black text-white'} ${className}`}
        style={{
          transform: [...translate.getTranslateTransform(), { scale }],
          ...(noShadow
            ? {}
            : {
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: isPressed ? 0 : 0.25,
                shadowRadius: 6,
                elevation: isPressed ? 0 : 5,
              }),
        }}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
