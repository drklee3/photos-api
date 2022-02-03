import { IImageProps, Image } from "native-base";
import * as React from "react";
import { Animated } from "react-native";
import {
  PinchGestureHandler,
  PinchGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";

const AnimatedNBImage = Animated.createAnimatedComponent(Image);

export default function PinchableImage(props: IImageProps) {
  const scaleVal = new Animated.Value(1);
  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: {
          scale: scaleVal,
        },
      },
    ],
    {
      useNativeDriver: false,
    }
  );

  const handleReset = (e: PinchGestureHandlerStateChangeEvent) => {
    if (e.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scaleVal, {
        toValue: 1,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <PinchGestureHandler
      onGestureEvent={onPinchEvent}
      onHandlerStateChange={handleReset}
    >
      <AnimatedNBImage
        {...props}
        source={props.source}
        style={{
          transform: [
            { perspective: 200 },
            {
              scale: scaleVal.interpolate({
                inputRange: [0.9, 100],
                outputRange: [0.9, 100],
                extrapolateLeft: "clamp",
              }),
            },
          ],
          zIndex: scaleVal.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 9999],
          }),
        }}
      />
    </PinchGestureHandler>
  );
}
