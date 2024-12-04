import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import { Plus } from 'lucide-react';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Task Dashboard</h1>
            <button
              onClick={() => setShowAddTask(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Task
            </button>
          </div>
          
          <TaskFilters />
          <TaskList />
          
          {showAddTask && <TaskForm onClose={() => setShowAddTask(false)} />}
        </div>
      </div>
    </Provider>
  );
}

export default App;