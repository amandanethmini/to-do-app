import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { todoApi } from './api/todoApi';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todoApi.getTodos();
      setTodos(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch todos');
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const response = await todoApi.createTodo(todoData);
      setTodos([response.data, ...todos]);
      setError(null);
    } catch (error) {
      setError('Failed to add todo');
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    try {
      const response = await todoApi.updateTodo(id, todoData);
      setTodos(todos.map(todo =>
        todo._id === id ? response.data : todo
      ));
      setEditingTodo(null);
      setError(null);
    } catch (error) {
      setError('Failed to update todo');
      console.error('Error updating todo:', error);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const response = await todoApi.toggleTodo(id);
      setTodos(todos.map(todo =>
        todo._id === id ? response.data : todo
      ));
      setError(null);
    } catch (error) {
      setError('Failed to toggle todo');
      console.error('Error toggling todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await todoApi.deleteTodo(id);
        setTodos(todos.filter(todo => todo._id !== id));
        setError(null);
      } catch (error) {
        setError('Failed to delete todo');
        console.error('Error deleting todo:', error);
      }
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container px-4 max-w-4xl">
        <header className="text-center mb-8" style={{ width: '1000px' }}>
          <h1
            style={{
              fontSize: '2.25rem',    // approx text-4xl
              fontWeight: '700',      // font-bold
              color: '#1f2937',       // text-gray-800
              marginBottom: '0.5rem', // mb-2
            }}
          >
            <img src="./list.png" alt="Todo List App" /> Todo List App
          </h1>

          <p
            style={{
              color: '#4b5563', // text-gray-600
            }}
          >
            Stay organized and productive
          </p>

          <div
            style={{
              marginTop: '1rem',          // mt-4
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',                // space-x-4
              fontSize: '0.875rem',       // text-sm
            }}
          >
            <span
              style={{
                backgroundColor: '#bfdbfe', // bg-blue-100
                color: '#1e40af',           // text-blue-800
                padding: '0.25rem 0.75rem', // px-3 py-1
                borderRadius: '9999px',     // rounded-full
              }}
            >
              Total: {totalCount}
            </span>

            <span
              style={{
                backgroundColor: '#d1fae5', // bg-green-100
                color: '#065f46',           // text-green-800
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
              }}
            >
              Completed: {completedCount}
            </span>

            <span
              style={{
                backgroundColor: '#fef3c7', // bg-yellow-100
                color: '#78350f',           // text-yellow-800
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
              }}
            >
              Pending: {totalCount - completedCount}
            </span>
          </div>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <TodoForm
          onAddTodo={handleAddTodo}
          editingTodo={editingTodo}
          onUpdateTodo={handleUpdateTodo}
          onCancelEdit={handleCancelEdit}
        />

        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4"> <img src="./list.png" alt="Todo List App" /></div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No todos yet
              </h3>
              <p className="text-gray-500">
                Add your first todo above to get started!
              </p>
            </div>
          ) : (
            todos.map(todo => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={handleToggleTodo}
                onEdit={handleEditTodo}
                onDelete={handleDeleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;