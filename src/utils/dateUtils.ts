export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0) return `In ${diffDays} days`;
  return `${Math.abs(diffDays)} days ago`;
};

export const isOverdue = (deadline: string): boolean => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  return deadlineDate < now;
};

export const getDateForInput = (date?: string): string => {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
};

export const getDaysUntilDeadline = (deadline: string): number => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};