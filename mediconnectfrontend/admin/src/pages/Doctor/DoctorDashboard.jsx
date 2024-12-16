import React, { useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, PieController, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
import { assets } from '../../assets/assets';

ChartJS.register(BarElement, PieController, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const DoctorDashboard = () => {
  const { dToken, dashData, setDashData, getDashData, completeAppointment, cancelAppointment } =
    useContext(DoctorContext);

  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  // Bar chart data (Earnings vs Appointments)
  const barChartData = {
    labels: ['Earnings', 'Appointments'],
    datasets: [
      {
        label: 'Count',
        data: dashData ? [dashData.earnings, dashData.appointments] : [0, 0],
        backgroundColor: ['#ff6384', '#36a2eb'],
        borderColor: ['#ff6384', '#36a2eb'],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Pie chart data (Appointments vs Patients)
  const pieChartData = {
    labels: ['Appointments', 'Patients'],
    datasets: [
      {
        data: dashData ? [dashData.appointments, dashData.patients] : [0, 0],
        backgroundColor: ['#4caf50', '#2196f3'],
        hoverBackgroundColor: ['#4caf50aa', '#2196f3aa'],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
  };

  return dashData && (
    <div className="m-5">
      {/* Stat Cards */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.earning_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {currency} {dashData.earnings}
            </p>
            <p className="text-gray-400">Earnings</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border- border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
            <p className="text-gray-400">Patients</p>
          </div>2
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex gap-5 mt-5">
        {/* Bar Chart for Earnings vs Appointments */}
        <div className="bg-white p-5 rounded shadow w-1/2">
          <h3 className="text-xl font-semibold text-gray-600 mb-3">Earnings vs Appointments</h3>
          <Bar data={barChartData} options={barChartOptions} />
        </div>

        {/* Pie Chart for Appointments vs Patients */}
        <div className="bg-white p-5 rounded shadow w-1/2">
          <h3 className="text-xl font-semibold text-gray-600 mb-3">Appointments vs Patients</h3>
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="bg-white">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>
        <div className="pt-4 border border-t-0">
          {dashData.latestAppointments.map((item, index) => (
            <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
              <img className="rounded-full w-10" src={item.userData.image} alt="" />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.docData.name}</p>
                <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs">Completed</p>
              ) : (
                <div className="flex">
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                  <img onClick={() => completeAppointment(item._id)} className="w-10 cursor-pointer" src={assets.tick_icon} alt="" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
