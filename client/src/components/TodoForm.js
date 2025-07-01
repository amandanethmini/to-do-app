import React, { useState } from 'react';
import './TodoForm.css'; // Import the CSS file

const TodoForm = ({ onAddTodo, editingTodo, onUpdateTodo, onCancelEdit }) => {
    const [title, setTitle] = useState(editingTodo ? editingTodo.title : '');
    const [description, setDescription] = useState(editingTodo ? editingTodo.description : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        if (editingTodo) {
            onUpdateTodo(editingTodo._id, { title, description, completed: editingTodo.completed });
        } else {
            onAddTodo({ title, description });
        }

        setTitle('');
        setDescription('');
    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        onCancelEdit();
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <h2 className="form-title">{editingTodo ? 'Edit Todo' : 'Add New Todo'}</h2>

            <div className="form-group">
                <input
                    type="text"
                    placeholder="Todo title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <textarea
                    placeholder="Description (optional)..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-textarea"
                />
            </div>

            <div className="button-group">
                <button type="submit" className="btn submit-btn">
                    {editingTodo ? 'Update Todo' : 'Add Todo'}
                </button>

                {editingTodo && (
                    <button type="button" onClick={handleCancel} className="btn cancel-btn">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TodoForm;
