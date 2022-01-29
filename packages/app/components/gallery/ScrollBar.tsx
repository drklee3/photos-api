import { Box, VStack } from "native-base";
import { Animated } from "react-native";

export interface ScrollBarProps {
  value: Animated.Value;
}

export default function ScrollBar({ value }: ScrollBarProps) {
  return (
    <Box height="100%" w="2" ml="2" backgroundColor="blue.800">
      <Animated.View
        style={{
          width: 6,
          borderRadius: 8,
          backgroundColor: "#ffffff",
          height: "6px",
          transform: [{ translateY: value }],
        }}
      />
    </Box>
  );
}
