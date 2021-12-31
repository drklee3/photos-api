import React from "react";
import { View } from "react-native";
import { UiNode, UiNodeTextAttributes } from "@ory/kratos-client";
import { getNodeId } from "../helpers/form";
import { Box, Text } from "native-base";

interface Props {
  node: UiNode;
  attributes: UiNodeTextAttributes;
}

export const NodeText = (props: Props) => {
  const name = getNodeId(props.node);
  return (
    <Box testID={`field/${name}`}>
      {props.node.meta.label?.text && (
        <Text variant="lead" testID={`field/${name}/label`}>
          {props.node.meta.label?.text}
        </Text>
      )}
      <Text variant="h3" testID={`field/${name}/text`}>
        {props.attributes.text.text}
      </Text>
    </Box>
  );
};
