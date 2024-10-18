import React from 'react'

import {createBrowserRouter,} from "react-router-dom";
import App from '../App';
// import Home from '../pages/Home';
// import MyJobs from '../pages/MyJobs';
// import SalaryPage from '../pages/SalaryPage';
// import CreateJob from '../pages/CreateJob';
// import UpdateJob from '../pages/UpdateJob';
// import JobDetails from '../pages/JobDetails';
// import Login from '../pages/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Home from '../Pages/Home';
import MyJobs from '../Pages/MyJobs';
import SalaryPage from '../Pages/SalaryPage';
import CreateJob from '../Pages/CreateJob';
import UpdateJob from '../Pages/UpdateJob';
import JobDetails from '../Pages/JobDetails';
import Login from '../Pages/Login';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/my-job",
            element: <PrivateRoute><MyJobs/></PrivateRoute>
        },
        {
            path: "/salary",
            element: <SalaryPage/>
        },
        {
          path: "/post-job",
          element: <CreateJob/>
        },
        {
          path: "edit-job/:id",
          element: <UpdateJob/>,
          loader: ({params}) => fetch(`https://job-fr45.onrender.com/all-jobs/${params.id}`)
        },
        {
          path:"/jobs/:id",
          element: <JobDetails/>,
        }
      ]
    },
    {
      path: "/login",
      element: <Login/>
    }
  ]);

  export default router;
