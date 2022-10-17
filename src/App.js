

import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { Outlet, Routes, Route } from 'react-router-dom';


import './App.css';
import 'vazirmatn/misc/Farsi-Digits/Vazirmatn-FD-font-face.css'
import 'vazirmatn/Vazirmatn-font-face.css'

import Login from './components/Login/Login';
import Oops from './components/Oops';
import PollPage from './components/PollPage/PollPage';
import Admin from './components/Admin/Admin';
import Create from './components/Admin/Create';
import Manage from './components/Admin/Manage';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './components/Unauthorized';
import useAuth from './hooks/useAuth';
import Home from './components/Home/Home';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Oops />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<PrivateRoute authorizedRoles={["admin", "student"]}/>}>
          <Route path="/" element={<Home />}>
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
    <>
    <ToastContainer position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>


    <div className='App'>
      <Outlet />
    </div>    
    </>

  )
}
