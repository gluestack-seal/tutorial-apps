export interface IProviderProps {
  children: React.ReactNode;
}

export interface IMarkComplete {
  id: number;
  is_completed: boolean;
}

export interface IDeleteImage {
  id: number;
  file_id: number;
}

export interface IToast {
  success: boolean;
  display: boolean;
  message: string;
}
