import React from 'react';
import './TodoItem.css'; // Import CSS

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
    const itemClass = `todo-item ${todo.completed ? 'completed' : 'pending'}`;
    const titleClass = `todo-title ${todo.completed ? 'done' : ''}`;
    const descClass = `todo-description ${todo.completed ? 'done' : ''}`;

    return (
        <div className={itemClass}>
            <div className="todo-main">
                <div className="todo-left">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggle(todo._id)}
                        className="todo-checkbox"
                    />

                    <div className="todo-text">
                        <h3 className={titleClass}>{todo.title}</h3>
                        {todo.description && (
                            <p className={descClass}>{todo.description}</p>
                        )}
                        <p className="todo-date">
                            Created: {new Date(todo.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="todo-actions">
                    <button onClick={() => onEdit(todo)} className="edit-btn" title="Edit">
                        <img src="./edit.png" alt="Todo List App" style={{ width: '60px', height: '60px' }} />
                    </button>

                    <button onClick={() => onDelete(todo._id)} className="delete-btn" title="Delete">
                        <img src="./delete.png" alt="Todo List App" style={{ width: '60px', height: '60px' }} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
