import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateStatus, deleteTask, editTask } from '../../store/tasksSlice';
import { Button, Modal, Input, DatePicker } from 'antd';
import { MdDelete, MdEdit } from 'react-icons/md';
import dayjs from 'dayjs';
import '../../App.css';

function TaskDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const task = useSelector((state) =>
        state.tasks.tasks.find((task) => task.id.toString() === id)
    );

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const [editedTask, setEditedTask] = useState({});

    // Handle task deletion
    const handleDelete = () => {
        dispatch(deleteTask({ id: id }));
        navigate('/'); // Navigate back to the home page
    };

    // Handle mark as completed
    const handleMarkAsCompleted = () => {
        dispatch(updateStatus({ id: task.id }));
    };

    // Open Edit Modal
    const openEditModal = () => {
        setEditedTask({ ...task });
        setIsEditModalVisible(true);
    };

    const openDeleteModal = () =>{
        setIsDeleteModalVisible(true);
    }
    // Handle Edit Save
    const handleSaveEdit = () => {
        dispatch(editTask(editedTask));
        setIsEditModalVisible(false);
    };

    if (!task) {
        return <div className="task-details-container"><h1>Task not found!</h1></div>;
    }


    return (
        <div className="task-details-container">
            {/* Task Information */}
            <div className="task-info-section">
                <h2 className="task-section-title">Task Information</h2>
                <table className="task-info-table">
                    <tbody>
                        <tr>
                            <td><strong>Title:</strong></td>
                            <td>{task.title}</td>
                        </tr>
                        <tr>
                            <td><strong>Description:</strong></td>
                            <td>{task.description}</td>
                        </tr>
                        <tr>
                            <td><strong>Status:</strong></td>
                            <td>{task.status}</td>
                        </tr>
                        <tr>
                            <td><strong>Due Date:</strong></td>
                            <td>{task.dueDate}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Actions Section */}
            <div className="task-actions-section">
                <h2 className="task-section-title">Actions</h2>
                <div className="task-actions">
                    <Button type="default" onClick={handleMarkAsCompleted}>
                        {task.status === 'Completed' ? 'Mark as Pending' : 'Mark as Completed'}
                    </Button>
                    <Button type="primary" onClick={openEditModal} className="edit-task-btn">
                        <MdEdit /> Edit Task
                    </Button>
                    <Button type="danger" onClick={openDeleteModal} className="delete-task-btn">
                        <MdDelete /> Delete Task
                    </Button>
                </div>
            </div>

            {/* Edit Task Modal */}
            <Modal
                title="Edit Task"
                open={isEditModalVisible}
                onOk={handleSaveEdit}
                onCancel={() => setIsEditModalVisible(false)}
            >
                <Input
                    placeholder="Task Title"
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <Input.TextArea
                    placeholder="Task Description"
                    value={editedTask.description}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                    style={{ marginBottom: '10px' }}
                />
                <DatePicker
                    value={dayjs(editedTask.dueDate)}
                    onChange={(date) => setEditedTask({ ...editedTask, dueDate: date.format('YYYY-MM-DD') })}
                    style={{ width: '100%' }}
                />
            </Modal>

            <Modal
                title="Delete Task"
                open={isDeleteModalVisible}
                onOk={handleDelete}
                onCancel={() => setIsDeleteModalVisible(false)}
            > 
            </Modal>
        </div>
    );
}

export default TaskDetails;
