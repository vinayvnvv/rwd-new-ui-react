export interface IPageLoader {
    loading ?: boolean;
    title ? : string;
}

export interface IPathModel {
  value ?: string;
  message ?: string;
  msgStatus ?: string;
  checking ?: boolean;
}

export interface ISnackBar {
	open : boolean;
	message ?: string;
	autoHideDuration ?: number;
}