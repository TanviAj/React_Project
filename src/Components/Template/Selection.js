import React from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";


const Selection = () => {
    const location = useLocation();
    return (
        <>
         <div className='sContainer'>
            <h1>Selection Page</h1>
            <Link to="/Selection"></Link>
         </div>
          <Outlet/>
        </>
       
      );
};

export default Selection;