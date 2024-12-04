import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus, deleteTask } from '../../store/tasksSlice.js';
import { MdDelete } from "react-icons/md";
import { Modal} from 'antd';
import '../../App.css'
function TaskView({ task }) {
    const dispatch = useDispatch();
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [deleteID, setDeleteID] = useState(null)
    const handleDelete = () => {
        dispatch(deleteTask({ id: deleteID }));
        setDeleteID(null);
    };
    const openDeleteModal = (id) =>{
        setDeleteID(id);
        setIsDeleteModalVisible(true);
    }
    return (
        <>
            <div className="task-item">
                <input
                    type="checkbox"
                    checked={task.status === 'Completed'}
                    onChange={() => dispatch(updateStatus({ id: task.id }))}
                    className='toggle-status'
                />
                <Link to={`/tasks/${task.id}`} className='title-date'>
                    <h1 className="task-title">{task.title}</h1>
                    <h3 className="task-due-date">{task.dueDate}</h3>
                </Link>
                <MdDelete className='delete-btn' onClick={()=>openDeleteModal(task.id)}/>
            </div>
            <Modal
                title="Delete Task"
                open={isDeleteModalVisible}
                onOk={handleDelete}
                onCancel={() => setIsDeleteModalVisible(false)}
            >
            </Modal>
        </>
    );
}

export default TaskView;