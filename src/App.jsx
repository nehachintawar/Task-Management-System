import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout.jsx';
import Home from './components/Home/Home.jsx';
import PendingTasks from "./components/Tasks/PendingTasks.jsx"
import Tasks from './components/Tasks/Tasks.jsx';
import CompletedTasks from './components/Tasks/CompletedTasks.jsx';
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='/pending-tasks' element={<PendingTasks />} />
          
          <Route path='/completed-tasks' element={<CompletedTasks />} />
          <Route path='/tasks/:id' element={<Tasks />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
