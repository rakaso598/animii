"use client"

import React, { useEffect, useState } from 'react';

const Todo: React.FC = () => {
    const [tasks, setTasks] = useState<any[]>([]); // 할 일 목록 (tasks)
    const [inputValue, setInputValue] = useState(''); // 입력 필드 값 (inputValue)
    const [filter, setFilter] = useState('전체'); // 필터 상태 (filter)
    const [filteredTasks, setFilteredTasks] = useState<any[]>([]);

    // 초기 데이터 로드
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    // 데이터 저장
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]); // tasks 배열이 변경될 때마다 실행됨을 의미

    // 필터 적용
    useEffect(() => {
        const filteredTasks = tasks.filter(task => {
            if (filter === '전체') return true;
            if (filter === '완료') return task.completed;
            if (filter === '미완료') return !task.completed;
            return true;
        });
        setFilteredTasks(filteredTasks);
    }, [tasks, filter]);

    // 기타 부수 효과 추가
    useEffect(() => {
        console.log("현재 할 일 목록:", tasks);
    }, [tasks]);

    return (
        <div>
            <h1>Todo List</h1>
            {/* 할 일 입력 및 추가 */}
            <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <button onClick={() => {
                const newTask = { id: Date.now(), text: inputValue, completed: false };
                setTasks([...tasks, newTask]);
                setInputValue('');
            }}>
                Add Task
            </button>

            {/* 필터링된 할 일 목록 표시 */}
            <ul>
                {filteredTasks.map(task => (
                    <li key={task.id}>
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.text}
                        </span>
                        <button onClick={() => {
                            setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
                        }}>
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onClick={() => {
                            setTasks(tasks.filter(t => t.id !== task.id));
                        }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;
