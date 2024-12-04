import React, {useEffect} from 'react';
import { Menu, Input, Layout } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../store/tasksSlice';
import SearchBar from '../SearchBar/SearchBar';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const currentPath = location.pathname;

  useEffect(() => {
    if (location.pathname === '/completed-tasks') {
      dispatch(setFilter({ payload: 'Completed' }));
    } else if (location.pathname === '/pending-tasks') {
      dispatch(setFilter({ payload: 'Pending' }));
    } else {
      dispatch(setFilter({ payload: 'All' }));
    }
  }, [location.pathname, dispatch]);

  const handleMenuClick = (e) => {
    switch (e.key) {
      case 'home':
        dispatch(setFilter({payload : "All"}));
        navigate('/');
        break;
      case 'pendingTasks':
        dispatch(setFilter({payload : "Pending"}));
        navigate('/pending-tasks');
        break;
      case 'completedTasks':
        dispatch(setFilter({payload : "Completed"}));
        navigate('/completed-tasks');
        break;
      default:
        break;
    }
  };

  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div style={{ fontWeight: 'bold', fontSize: '20px', color: 'white' }}>
        Task Manager
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        onClick={handleMenuClick}
        selectedKeys={[currentPath]}
        style={{ flex: 1, justifyContent: 'center' }}
        items={[
          { key: 'home', label: 'Home' },
          { key: 'pendingTasks', label: 'Pending Tasks' },
          { key: 'completedTasks', label: 'Completed Tasks' },
        ]}
      />
      <SearchBar />
    </Header>
  );
};

export default Navbar;
