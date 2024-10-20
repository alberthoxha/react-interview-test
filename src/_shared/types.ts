export type IStatusIndicator = "onroad" | "completed" | "onhold" | "inprogress";

export interface IStatus {
  status: IStatusIndicator;
}

export interface Jobs {
  id: string;
  status: IStatusIndicator;
  title: string;
  categories: string[];
}
