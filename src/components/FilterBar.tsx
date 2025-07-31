import React from 'react';
import { FilterType, SortType, Category } from '../types';
import { Filter, SortAsc, Search } from 'lucide-react';

interface FilterBarProps {
  filter: FilterType;
  sort: SortType;
  selectedCategory: string;
  searchQuery: string;
  categories: Category[];
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
  onCategoryChange: (categoryId: string) => void;
  onSearchChange: (query: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  sort,
  selectedCategory,
  searchQuery,
  categories,
  onFilterChange,
  onSortChange,
  onCategoryChange,
  onSearchChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value as FilterType)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center space-x-2">
          <SortAsc className="w-4 h-4 text-gray-500" />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortType)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="deadline">By Deadline</option>
            <option value="created">By Created</option>
            <option value="priority">By Priority</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
    </div>
  );
};