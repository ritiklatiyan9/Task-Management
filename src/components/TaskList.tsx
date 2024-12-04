import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TaskItem from './TaskItem';
import { Task } from '../types/task';
import { isAfter, parseISO } from 'date-fns';

export default function TaskList() {
  const { tasks, filter, searchQuery } = useSelector((state: RootState) => state.tasks);

  const filteredTasks = tasks.filter((task: Task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const isOverdue = task.dueDate ? isAfter(new Date(), parseISO(task.dueDate)) : false;

    switch (filter) {
      case 'completed':
        return task.completed && matchesSearch;
      case 'pending':
        return !task.completed && matchesSearch;
      case 'overdue':
        return !task.completed && isOverdue && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}