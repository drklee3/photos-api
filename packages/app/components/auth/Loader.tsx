import { Spinner, View } from "native-base";
import { Easing } from "react-native-reanimated";
import { MotiView } from "moti";
import React from "react";
import { useMeasure } from "react-use";

export interface LoaderProps {
  visible: boolean;
  children: JSX.Element | JSX.Element[];
}

interface LoaderIconProps {
  visible: boolean;
}

function LoaderIcon({ visible }: LoaderIconProps) {
  return (
    <MotiView
      from={{
        opacity: 1,
      }}
      animate={{
        opacity: visible ? 1 : 0,
      }}
      transition={{
        type: "timing",
        duration: 250,
      }}
    >
      <Spinner color="blue.400" size="lg" />
    </MotiView>
  );
}

export default function Loader({ visible, children }: LoaderProps) {
  const [ref, { height }] = useMeasure();

  return (
    <>
      {!visible && <LoaderIcon visible={!visible} />}
      <View overflow="hidden">
        <MotiView
          from={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: visible && height > 0 ? height : undefined,
            opacity: 1,
          }}
          transition={{
            type: "timing",
            easing: Easing.inOut(Easing.quad),
            duration: 350,
          }}
        >
          <View ref={ref}>{children}</View>
        </MotiView>
      </View>
    </>
  );
}
