import React, { useState, useEffect, useMemo } from 'react';
import { Task, Category, FilterType, SortType } from './types';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
import { FilterBar } from './components/FilterBar';
import { TaskStats } from './components/TaskStats';
import { saveTasks, loadTasks, saveCategories, loadCategories } from './utils/storage';
import { isOverdue } from './utils/dateUtils';
import { Plus, ListTodo } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('deadline');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Load data on mount
  useEffect(() => {
    const savedTasks = loadTasks();
    const savedCategories = loadCategories();
    setTasks(savedTasks);
    setCategories(savedCategories);
  }, []);

  // Save tasks when they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Save categories when they change
  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply status filter
    switch (filter) {
      case 'active':
        filtered = filtered.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      case 'overdue':
        filtered = filtered.filter(task => 
          !task.completed && task.deadline && isOverdue(task.deadline)
        );
        break;
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(task => task.category === selectedCategory);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'deadline':
          if (!a.deadline && !b.deadline) return 0;
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [tasks, filter, sort, selectedCategory, searchQuery]);

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      setTasks(tasks.map(task =>
        task.id === editingTask.id
          ? { ...taskData, id: editingTask.id, createdAt: editingTask.createdAt }
          : task
      ));
      setEditingTask(undefined);
    } else {
      const newTask: Task = {
        ...taskData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
    }
    setShowForm(false);
  };

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl shadow-lg">
              <ListTodo className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">TaskFlow</h1>
          <p className="text-gray-600 text-lg">Organize your tasks with categories and deadlines</p>
        </div>

        {/* Stats */}
        <TaskStats tasks={tasks} />

        {/* Filter Bar */}
        <FilterBar
          filter={filter}
          sort={sort}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          categories={categories}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchQuery}
        />

        {/* Add Task Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Task</span>
          </button>
        </div>

        {/* Tasks Grid */}
        <div className="space-y-4">
          {filteredAndSortedTasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md mx-auto">
                <ListTodo className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchQuery || filter !== 'all' || selectedCategory
                    ? 'No tasks found'
                    : 'No tasks yet'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery || filter !== 'all' || selectedCategory
                    ? 'Try adjusting your filters or search query'
                    : 'Get started by adding your first task'}
                </p>
                {!searchQuery && filter === 'all' && !selectedCategory && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
                  >
                    Add Task
                  </button>
                )}
              </div>
            </div>
          ) : (
            filteredAndSortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                categories={categories}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>

        {/* Task Form Modal */}
        {showForm && (
          <TaskForm
            task={editingTask}
            categories={categories}
            onSave={handleSaveTask}
            onCancel={handleCloseForm}
          />
        )}
      </div>
    </div>
  );
}

export default App;