import { UiNode, UiNodeInputAttributes } from "@ory/kratos-client";
import { FormControl, Input } from "native-base";
import React from "react";
import { TextInputProps } from "react-native";
import {
  getNodeId,
  getNodeTitle,
  isUiNodeInputAttributes,
} from "../helpers/form";

interface Props extends InputProps {
  node: UiNode;
  attributes: UiNodeInputAttributes;
}

export interface InputProps {
  onChange: (value: any) => void;
  value: any;
  disabled?: boolean;
  textInputOverride?: TextInputOverride;
}

export type TextInputOverride = (
  field: UiNode,
  props: TextInputProps
) => TextInputProps;

const guessVariant = ({ attributes }: UiNode) => {
  if (!isUiNodeInputAttributes(attributes)) {
    return "text";
  }

  if (attributes.name === "identifier") {
    return "username";
  }

  switch (attributes.type) {
    case "hidden":
      return null;
    case "email":
      return "email";
    case "submit":
      return "button";
    case "password":
      return "password";
    default:
      return "text";
  }
};

const typeToState = ({
  type,
  disabled,
}: {
  type?: string;
  disabled?: boolean;
}) => {
  if (disabled) {
    return "disabled";
  }
  switch (type) {
    case "error":
      return "error";
  }
  return undefined;
};

export const NodeInput = ({
  node,
  attributes,
  value,
  onChange,
  disabled,
  textInputOverride,
}: Props) => {
  const variant = guessVariant(node);
  if (!variant) {
    return null;
  }

  let extraProps: TextInputProps = {};
  switch (variant) {
    case "email":
      extraProps.autoCompleteType = "email";
      extraProps.keyboardType = "email-address";
      extraProps.textContentType = "emailAddress";
      extraProps.autoCapitalize = "none";
      extraProps.autoCorrect = false;
      break;
    case "password":
      extraProps.autoCompleteType = "password";
      extraProps.textContentType = "password";
      extraProps.autoCapitalize = "none";
      extraProps.secureTextEntry = true;
      extraProps.autoCorrect = false;
      break;
    case "username":
      extraProps.autoCompleteType = "username";
      extraProps.textContentType = "username";
      extraProps.autoCapitalize = "none";
      extraProps.autoCorrect = false;
      break;
  }

  if (textInputOverride) {
    extraProps = textInputOverride(node, extraProps);
  }

  const name = getNodeId(node);
  const title = getNodeTitle(node);

  return (
    <FormControl
      testID={`field/${name}`}
      isDisabled={disabled}
      isInvalid={node.messages?.length > 0}
    >
      <FormControl.Label>{title}</FormControl.Label>
      <Input
        testID={name}
        onChange={onChange}
        value={value ? String(value) : ""}
        editable={!disabled}
        onChangeText={onChange}
        {...extraProps}
      />
      {node.messages?.map(({ text, id, type }, k) => (
        <FormControl.ErrorMessage key={`${id}${k}`}>
          {text}
        </FormControl.ErrorMessage>
      ))}
    </FormControl>
  );
};