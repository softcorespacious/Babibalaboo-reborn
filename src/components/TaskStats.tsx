import React from 'react';
import { Task } from '../types';
import { isOverdue } from '../utils/dateUtils';
import { CheckCircle, Clock, AlertTriangle, List } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = tasks.filter(task => !task.completed).length;
  const overdueTasks = tasks.filter(task => !task.completed && task.deadline && isOverdue(task.deadline)).length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: List,
      color: 'bg-blue-500',
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      label: 'Active',
      value: activeTasks,
      icon: Clock,
      color: 'bg-amber-500',
    },
    {
      label: 'Overdue',
      value: overdueTasks,
      icon: AlertTriangle,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Task Overview</h2>
        <div className="text-sm text-gray-500">
          {completionRate}% completion rate
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};