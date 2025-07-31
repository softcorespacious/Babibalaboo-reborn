export interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  deadline?: string;
  completed: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export type FilterType = 'all' | 'active' | 'completed' | 'overdue';
export type SortType = 'deadline' | 'created' | 'priority' | 'alphabetical';