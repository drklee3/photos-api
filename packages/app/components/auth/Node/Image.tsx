import React from "react";
import { UiNode, UiNodeImageAttributes } from "@ory/kratos-client";
import { getNodeId } from "../helpers/form";
import { View } from "react-native";
import { Image } from "native-base";

interface Props {
  node: UiNode;
  attributes: UiNodeImageAttributes;
}

export const NodeImage = (props: Props) => {
  const width = props.attributes.width ? props.attributes.width + "px" : "auto";
  const height = props.attributes.height
    ? props.attributes.height + "px"
    : "auto";

  const name = getNodeId(props.node);
  return (
    <View testID={`field/${name}`}>
      <Image
        width={width}
        height={height}
        {...props}
        source={{
          uri: props.attributes.src,
        }}
      />
    </View>
  );
};
