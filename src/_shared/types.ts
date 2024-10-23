export type IStatusIndicator =
  | "onroad"
  | "completed"
  | "onhold"
  | "inprogress"
  | string;

export interface IStatus {
  status: IStatusIndicator;
}

export interface Jobs {
  id?: string;
  status: IStatusIndicator | string;
  title: string;
  categories: string[];
}
