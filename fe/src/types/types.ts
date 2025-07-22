export type DefaultState = {
  loading: boolean;
  error: string | null;
} & Partial<{
  userBoard: BoardResponse[];
  boardDetail: BoardResponse;
  boardCard: CardResponse[];
  taskList: {
    [cardId: string]: TaskResponse[];
  };
}>;

export interface AuthInfo {
  id: string;
  email: string;
}
export type BoardResponse = {
  id?: string;
  name: string;
  description: string;
};

export type CardResponse = {
  id: string;
  name: string;
  description: string;
  params?: string
};

export type CardRequest = {
  name: string;
  description: string;
  createAt?: string
  params?: string
};

export type TaskResponse = {
  id: string;
  cardId: string;
  title: string;
  description: string;
  status: string;
};
