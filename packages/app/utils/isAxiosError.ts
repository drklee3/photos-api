import type { AxiosError } from "axios";

export function isAxiosError(x: any): x is AxiosError {
  return x.isAxiosError;
}
