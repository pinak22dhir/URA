import React from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <>
      <ToastContainer />
      {aToken || dToken ? (
        <div className="bg-[#F8F9FD]">
          <NavBar />
          <div className="flex">
            <Sidebar />
            <Routes>
              {/* Conditional Route Rendering for Admin or Doctor */}
              {aToken ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/admin-dashboard" element={<Dashboard />} />
                  <Route path="/all-appointments" element={<AllAppointments />} />
                  <Route path="/add-doctor" element={<AddDoctor />} />
                  <Route path="/doctor-list" element={<DoctorsList />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<DoctorDashboard />} />
                  <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                  <Route path="/doctor-appointments" element={<DoctorAppointments />} />
                  <Route path="/doctor-profile" element={<DoctorProfile />} />
                </>
              )}
              {/* Catch-all route for authenticated users */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          {/* Public route for Login */}
          <Route path="/login" element={<Login />} />
          {/* Catch-all route for unauthenticated users */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
};

export default App;
