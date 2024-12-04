import React from 'react'
import TaskView from './TaskView';
import { useSelector } from 'react-redux';

function PendingTasks() {
  const StatusFilters = useSelector(state => state.tasks.filters);

  const tasks = useSelector((state) => state.tasks.tasks) || [];

  const allPendingTasks = tasks.filter(task=>task.status === StatusFilters.payload);


  if (allPendingTasks?.length === 0) {
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        <div className='task-container'>
          <h1 style={{textAlign: 'center'}}>No Tasks Pending</h1>
        </div>
      </div>
    )
  }


  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <div className='task-container'>
        {
          allPendingTasks?.length > 0 && allPendingTasks.map(task => (
            <TaskView key={task.id} task={task} />
          ))
        }
      </div>
    </div>
  )
}

export default PendingTasks