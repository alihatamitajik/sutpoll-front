import './App.css';
import Login from './components/Login/Login';
import { Outlet, Routes, Route } from 'react-router-dom';
import Oops from './components/Oops';
import Polls from './components/Polls/Polls';
import PollPage from './components/PollPage/PollPage';
import Admin from './components/Admin/Admin';
import Create from './components/Admin/Create';
import Manage from './components/Admin/Manage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Oops />} />

        {/* protected routes */}
        <Route path="/" element={<Polls />}>
          <Route path="polls/:slug" element={<PollPage />}/>
        </Route>

        {/* Admin Routes */}
        <Route dash="admin" element={<Admin />}>
          <Route path="/admin" element={<></>} />
          <Route path="create" element={<Create />} />
          <Route path="manage/:slug" element={<Manage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

const Layout = () => {
  return (
    <div className='App'>
      <Outlet />
    </div>
  )
}
