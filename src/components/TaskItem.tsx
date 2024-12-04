import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskComplete } from '../store/taskSlice';
import { Task } from '../types/task';
import { Trash2, Check, X } from 'lucide-react';
import { format, isAfter, parseISO } from 'date-fns';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const dispatch = useDispatch();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const isOverdue = isAfter(new Date(), parseISO(task.dueDate));

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    dispatch(deleteTask(task.id));
    setShowConfirmDelete(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <button
              onClick={() => dispatch(toggleTaskComplete(task.id))}
              className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                task.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300'
              }`}
            >
              {task.completed && <Check className="w-4 h-4 text-white" />}
            </button>
            <h3
              className={`text-lg font-medium ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.title}
            </h3>
          </div>
          <p className="mt-1 text-gray-600">{task.description}</p>
          <div className="mt-2 flex items-center">
            <span
              className={`text-sm ${
                isOverdue && !task.completed ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              Due: {format(parseISO(task.dueDate), 'MMM d, yyyy')}
            </span>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="ml-4 p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium mb-4">Delete Task</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}