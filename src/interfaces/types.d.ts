export type Board = Column[];

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  position: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  position: number;
}

export interface Session {
  email: string;
  token: string;
}
