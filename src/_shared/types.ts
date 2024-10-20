export type IStatusIndicator = "onroad" | "completed" | "onhold" | "inprogress";

export interface IStatus {
  status: IStatusIndicator;
}
