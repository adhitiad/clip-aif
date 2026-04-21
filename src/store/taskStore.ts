import { create } from 'zustand';

export type TaskStatus = 'pending' | 'processing' | 'success' | 'failed';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  progress: number;
  resultUrl?: string;
  createdAt: number;
}

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'progress' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
  getActiveTasks: () => Task[];
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  
  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      progress: 0,
      createdAt: Date.now(),
    };
    set((state) => ({
      tasks: [newTask, ...state.tasks],
    }));
  },

  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) => 
        task.id === id ? { ...task, ...updates } : task
      ),
    }));
  },

  removeTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },

  getActiveTasks: () => {
    return get().tasks.filter((task) => task.status === 'pending' || task.status === 'processing');
  },
}));
