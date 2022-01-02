import React, { useEffect, useState } from "react";
import {
  SelfServiceLoginFlow,
  SelfServiceRegistrationFlow,
  SelfServiceSettingsFlow,
  SubmitSelfServiceLoginFlowBody,
  SubmitSelfServiceRegistrationFlowBody,
  SubmitSelfServiceSettingsFlowBody,
  UiNode,
} from "@ory/kratos-client";
import { getNodeId, isUiNodeInputAttributes } from "./helpers/form";
import { Node, TextInputOverride } from "./Node";
import { Box, Text, VStack } from "native-base";

interface Props<T> {
  flow?:
    | SelfServiceLoginFlow
    | SelfServiceRegistrationFlow
    | SelfServiceSettingsFlow;
  onSubmit: (payload: T) => Promise<void>;
  only?: "password" | "profile" | "totp" | "lookup_secret";
  textInputOverride?: TextInputOverride;
}

export function SelfServiceFlow<
  T extends
    | SubmitSelfServiceSettingsFlowBody
    | SubmitSelfServiceLoginFlowBody
    | SubmitSelfServiceRegistrationFlowBody
>({ flow, only, onSubmit, textInputOverride }: Props<T>) {
  const [inProgress, setInProgress] = useState(false);
  const [values, setValues] = useState<T>({} as T);
  const [nodes, setNodes] = useState<Array<UiNode>>([]);

  useEffect(() => {
    if (!flow) {
      return;
    }

    const nodes = flow.ui.nodes.filter(({ group }) => {
      if (only) {
        return group === only || group === "default";
      }
      return true;
    });

    const values: Partial<T> = {};
    nodes.forEach((node: UiNode) => {
      const name = getNodeId(node);

      const key = name as keyof T;
      if (isUiNodeInputAttributes(node.attributes)) {
        if (
          node.attributes.type === "button" ||
          node.attributes.type === "submit"
        ) {
          // In order to mimic real HTML forms, we need to skip setting the value
          // for buttons as the button value will (in normal HTML forms) only trigger
          // if the user clicks it.
          return;
        }
        values[key] = node.attributes.value;
      }
    });

    setValues(values as T);
    setNodes(nodes);
  }, [flow]);

  if (!flow) {
    return null;
  }

  const onChange = (name: string) => (value: any) => {
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const getValue = (name: string) => values[name as keyof T];
  const onPress = async (key: string, value: any) => {
    // Prevent double send
    if (inProgress) {
      return;
    }

    setInProgress(true);

    await onSubmit({ ...values, [key]: value });
    setInProgress(false);
  };

  return (
    <VStack space={3}>
      {flow.ui.messages?.length && (
        <Box testID="form-messages">
          {flow.ui.messages?.map(({ text, id }, k) => (
            <Text testID={`ui/message/${id}`} key={`${id}${k}`}>
              {text}
            </Text>
          ))}
        </Box>
      )}

      {nodes.map((node: UiNode, k) => {
        const name = getNodeId(node);
        return (
          <Node
            key={`form-field-${flow.ui.action || ""}-${name}-${k}`}
            textInputOverride={textInputOverride}
            disabled={inProgress}
            value={getValue(name)}
            onChange={onChange(name)}
            node={node}
            isSubmitting={inProgress}
            onSubmitPress={onPress}
          />
        );
      })}
    </VStack>
  );
}
