"use client";

import React, { useEffect, useState } from 'react';
import styles from '../../styles/Todo.module.css';

const Todo: React.FC = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('전체');
    const [filteredTasks, setFilteredTasks] = useState<any[]>([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const filteredTasks = tasks.filter(task => {
            if (filter === '전체') return true;
            if (filter === '완료') return task.completed;
            if (filter === '미완료') return !task.completed;
            return true;
        });
        setFilteredTasks(filteredTasks);
    }, [tasks, filter]);

    useEffect(() => {
        console.log("현재 할 일 목록:", tasks);
    }, [tasks]);

    return (
        <div className={styles.container}>
            <h1>Todo List</h1>
            <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className={styles.input}
            />
            <button
                onClick={() => {
                    const newTask = { id: Date.now(), text: inputValue, completed: false };
                    setTasks([...tasks, newTask]);
                    setInputValue('');
                }}
                className={styles.button}
            >
                Add Task
            </button>

            <ul className={styles.list}>
                {filteredTasks.map(task => (
                    <li key={task.id} className={styles.listItem}>
                        <span className={task.completed ? styles.completed : ''}>
                            {task.text}
                        </span>
                        <button
                            onClick={() => {
                                setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
                            }}
                            className={styles.button}
                        >
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button
                            onClick={() => {
                                setTasks(tasks.filter(t => t.id !== task.id));
                            }}
                            className={styles.button}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;
