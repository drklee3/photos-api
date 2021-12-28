import { IToastProps, useToast } from "native-base";

export default function useToastAlert() {
  const { isActive, show, ...rest } = useToast();

  const showOnce = (props: IToastProps) => {
    if (!isActive(props.id)) {
      show({
        ...props,
      });
    }
  };

  return {
    show: showOnce,
    isActive,
    ...rest,
  };
}
