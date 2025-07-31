import React from 'react';
import { Task, Category } from '../types';
import { formatDate, isOverdue, getDaysUntilDeadline } from '../utils/dateUtils';
import { Calendar, Clock, Edit, Trash2, CheckCircle, Circle, AlertTriangle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  categories: Category[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  categories,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const category = categories.find(c => c.id === task.category);
  const overdue = task.deadline && isOverdue(task.deadline) && !task.completed;
  const daysUntil = task.deadline ? getDaysUntilDeadline(task.deadline) : null;
  
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-amber-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const getUrgencyIndicator = () => {
    if (!task.deadline || task.completed) return null;
    
    if (overdue) {
      return (
        <div className="flex items-center text-red-600 text-sm">
          <AlertTriangle className="w-4 h-4 mr-1" />
          Overdue
        </div>
      );
    }
    
    if (daysUntil !== null && daysUntil <= 2) {
      return (
        <div className="flex items-center text-amber-600 text-sm">
          <Clock className="w-4 h-4 mr-1" />
          Due soon
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${getPriorityColor()} hover:shadow-md transition-all duration-200 ${
      task.completed ? 'opacity-70' : ''
    } ${overdue ? 'ring-2 ring-red-200' : ''}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1">
            <button
              onClick={() => onToggleComplete(task.id)}
              className="mt-1 text-gray-400 hover:text-green-500 transition-colors duration-200"
            >
              {task.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold text-gray-900 mb-1 ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-gray-600 text-sm mb-3 ${
                  task.completed ? 'line-through' : ''
                }`}>
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {category && (
              <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${category.color}`}>
                {category.name}
              </span>
            )}
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md capitalize">
              {task.priority} priority
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {getUrgencyIndicator()}
            {task.deadline && (
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(task.deadline)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};