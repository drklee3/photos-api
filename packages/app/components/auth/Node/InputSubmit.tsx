import { UiNode, UiNodeInputAttributes } from "@ory/kratos-client";
import { Button, View } from "native-base";
import React from "react";
import { getNodeId, getNodeTitle } from "../helpers/form";

interface Props extends InputSubmitProps {
  node: UiNode;
  attributes: UiNodeInputAttributes;
}

export interface InputSubmitProps {
  isSubmitting: boolean;
  onSubmitPress: (key: string, value: any) => void;
  onChange: (value: any) => void;
}

export const NodeInputSubmit = ({
  node,
  attributes,
  isSubmitting,
  onSubmitPress,
  onChange,
}: Props) => {
  if (attributes.type !== "submit") {
    return null;
  }

  const name = getNodeId(node);
  const title = getNodeTitle(node);

  return (
    <View testID={`field/${name}/${attributes.value}`} mt="2">
      <Button
        testID="submit-form"
        isLoading={isSubmitting}
        colorScheme="blue"
        onPress={() => {
          onSubmitPress(attributes.name, attributes.value);
        }}
      >
        {title}
      </Button>
    </View>
  );
};
