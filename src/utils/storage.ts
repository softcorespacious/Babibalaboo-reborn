import { Task, Category } from '../types';

const TASKS_KEY = 'todo-tasks';
const CATEGORIES_KEY = 'todo-categories';

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const loadTasks = (): Task[] => {
  const stored = localStorage.getItem(TASKS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveCategories = (categories: Category[]): void => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

export const loadCategories = (): Category[] => {
  const stored = localStorage.getItem(CATEGORIES_KEY);
  return stored ? JSON.parse(stored) : [
    { id: '1', name: 'Work', color: 'bg-blue-500' },
    { id: '2', name: 'Personal', color: 'bg-green-500' },
    { id: '3', name: 'Shopping', color: 'bg-purple-500' },
    { id: '4', name: 'Health', color: 'bg-red-500' },
  ];
};