export interface Column {
  id: string;
  title: string;
  taskIds: Task[];  
}

export interface Task {
  id: string;
  title: string;
  description: string;
}
