import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppcontextProvider from './context/Appcontext.jsx'
import AdmincontextProvider from './context/Admincontext.jsx'
import DoctorcontextProvider from './context/Doctorcontext.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <AdmincontextProvider>
    <DoctorcontextProvider>
      <AppcontextProvider>
        <App />
        <ToastContainer
         position="top-right"
         autoClose={2000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="colored"
         bodyClassName='toastBody'/>

      </AppcontextProvider>
    </DoctorcontextProvider>
   </AdmincontextProvider>
    
  </BrowserRouter>,
)
