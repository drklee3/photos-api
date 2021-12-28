import * as React from "react";
import { Button as NButton, IButtonProps } from "native-base";

export enum ButtonType {
  Primary,
}

interface ButtonProps {
  type: ButtonType;
  children?: JSX.Element | JSX.Element[] | string;
}

type Props = ButtonProps & IButtonProps;

export default function Button({ type, children, ...props }: Props) {
  const colorScheme = colorSchemeFromType(type);

  return (
    <NButton colorScheme={colorScheme} {...props}>
      {children}
    </NButton>
  );
}

function colorSchemeFromType(type: ButtonType): string {
  switch (type) {
    case ButtonType.Primary:
      return "blue";
    default:
      return "blue";
  }
}
