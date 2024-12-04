import React, { useState } from 'react'
import { Input } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function SearchBar() {
    const tasks = useSelector(state => state.tasks.tasks) || [];

    const [isSearchActive, setIsSearchActive] = useState(false);

    

    const [searchedTasks, setSearchedTasks] = useState([]);

    const searchTasks = (e) => {
        const searchStr = e.target.value.toLowerCase();
        const temp = tasks.filter(task =>
            task.title.toLowerCase().includes(searchStr)
        );
        console.log(searchStr);
        
        setSearchedTasks(temp);
    };


    return (
        <div className="search-container">
            <Input
                placeholder="Search tasks..."
                onKeyUp={searchTasks}
                onFocus={() => setIsSearchActive(true)} // Set active on focus
                onBlur={() => setTimeout(()=>setIsSearchActive(false),200)} // Set inactive on blur
                style={{ maxWidth: '300px' }}
                className="search-input"
            />
            {isSearchActive && searchedTasks?.length > 0 && (
                <div className="search-results">
                    {searchedTasks.map((task) => (
                        <Link key={task.id} to={`tasks/${task.id}`} className='search-result-item'>
                            <h1 className="task-title">{task.title}</h1>
                            <p className="task-due-date">{task.dueDate}</p>
                        </Link>
                    ))}
                </div>
            )}
            {
                isSearchActive && searchedTasks?.length === 0 && (
                    <div className='search-results'>
                        <div className='search-result-item'>
                            <h1> No Items Found</h1>
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default SearchBar