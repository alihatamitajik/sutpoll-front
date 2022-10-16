import './App.css';
import Login from './components/Login/Login';
import { Outlet, Routes, Route } from 'react-router-dom';
import Oops from './components/Oops';
import Polls from './components/Polls/Polls';
import PollPage from './components/PollPage/PollPage';
import Admin from './components/Admin/Admin';
import Create from './components/Admin/Create';
import Manage from './components/Admin/Manage';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './components/Unauthorized';
import useAuth from './hooks/useAuth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Oops />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<PrivateRoute authorizedRoles={["admin", "student"]}/>}>
          <Route path="/" element={<Polls />}>
            <Route path="polls/:slug" element={<PollPage />}/>
          </Route>
        </Route>
        

        {/* Admin Routes */}
        <Route element={<PrivateRoute authorizedRoles={["admin"]}/>}>
          <Route path="admin" element={<Admin />}>
            <Route index element={<></>} />
            <Route path="create" element={<Create />} />
            <Route path="manage/:slug" element={<Manage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

const Layout = () => {
  const {auth} = useAuth();

  console.log(auth);

  return (
    <div className='App'>
      <Outlet />
    </div>
  )
}
