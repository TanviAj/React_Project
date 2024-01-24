
import './App.css';
//import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Login from './Components/Login/Login';
import Layout from './Components/Layout/Layout';
import Template from './Components/Template/Template';
import Query from './Components/Query/Query';
import FileUpload from './Components/FileUpload/FileUpload';
import Execution from './Components/Execution/Execution';
import { Routes , Route, createBrowserRouter, RouterProvider} from 'react-router-dom';
import Selection from './Components/Template/Selection';


function App() {

    // initialize a browser router
    const router = createBrowserRouter([
      {
         path: "/",
         element: <Login />,
     },
      {
        path: "",
        element: <Layout />,
        // child route components
      children: [
        {
          path: "/fileupload",
          element: <FileUpload />,
        },
        // other pages....
        {
          path: "/template",
          element: <Template />,
        },
        {
          path: "/query",
          element: <Query />,
        },
        {
          path: "/execution",
          element: <Execution />,
        },
      ],
      },
      
    ])
  
    return (
        <RouterProvider router={router} />
    )

  return (

    <div>
        <Routes>
           { <Route path="/" element={<Login/>}></Route> }
           <Route path="/" element={<Layout/>}></Route>
           <Route path="/fileupload" element={<FileUpload/>}></Route>
           <Route path="/template" element={<Template/>}></Route>
           <Route path="/query" element={<Query/>}></Route>
           <Route path="/execution" element={<Execution/>}></Route>
           <Route path="/selection" element={<Template/>}></Route>
           <Route path="/condition" element={<Template/>}></Route>
           <Route path="/aggregation" element={<Template/>}></Route>
        </Routes>
    </div>
  );
}
                                
export default App;
