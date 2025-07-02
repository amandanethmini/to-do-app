import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const todoApi = {
    // Get all todos
    getTodos: () => api.get('/todos'),

    // Create new todo
    createTodo: (todo) => api.post('/todos', todo),

    // Update todo
    updateTodo: (id, todo) => api.put(`/todos/${id}`, todo),

    // Delete todo
    deleteTodo: (id) => api.delete(`/todos/${id}`),

    // Toggle todo completion
    toggleTodo: (id) => api.patch(`/todos/${id}/toggle`)
};