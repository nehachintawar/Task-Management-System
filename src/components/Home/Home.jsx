import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskView from '../Tasks/TaskView.jsx';
import { addTask } from '../../store/tasksSlice.js';
import { Button, Input, DatePicker } from 'antd';
import 'antd/dist/reset.css';
import dayjs from 'dayjs'

const Home = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks) || [];

    console.log(tasks);
    const handleAddTask = () => {
        if (taskTitle && taskDescription && taskDueDate) {
            dispatch(
                addTask({
                    id: Date.now(),
                    title: taskTitle,
                    description: taskDescription,
                    dueDate: taskDueDate,
                    status: "Pending"
                })
            );
            setTaskTitle('');
            setTaskDescription('');
            setTaskDueDate('');
        }
    };


    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>

            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="Task Title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                <Input.TextArea
                    placeholder="Task Description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                <DatePicker
                    value={taskDueDate ? dayjs(taskDueDate, 'YYYY-MM-DD') : null} // Convert string to dayjs if needed
                    onChange={(date) => setTaskDueDate(date ? date.format('YYYY-MM-DD') : '')} // Format date to string
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <Button type="primary" onClick={handleAddTask}>
                    Add Task
                </Button>
            </div>

            <h2>All Tasks</h2>
            <div className='task-container'>
                {
                    tasks?.length > 0 && tasks.map(task => (
                        <TaskView key={task.id} task={task} />
                    ))
                }
            </div>

        </div>
    );
};

export default Home;