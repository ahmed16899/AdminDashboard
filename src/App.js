import logo from './logo.svg';
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Signin from './components/auth/Signin';
import Auth from './components/auth/Auth';
import Main from './components/Main';
import Signup from './components/auth/Signup';
/*import ViewUsers from './components/admin/ViewUsers';
import Dashboard from './components/admin/Dashboard';*/

import { ToastProvider, useToasts } from 'react-toast-notifications';
import React, { lazy } from 'react';
import Admin from './components/admin/Admin';

//const Admin = lazy(() => import('./components/admin/Admin'));

const Dashboard = lazy(() => import('./components/admin/Dashboard'));
const ViewUsers = lazy(() => import('./components/admin/ViewUsers'));
/*const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path='/' element={<Home />}></Route>
  </Route>
)*/


const router = createBrowserRouter(
  [{path:'/' , element:<Main /> ,  children:[
    {path:'' , element:<Home/>}
  ]},
  {path:'/auth' , element:<Auth /> , children:[
    {path:'signin' , element:<Signin/>},
    {path:'signup' , element:<Signup/>},
  ]},
  {path:'/admin' , element:<Admin /> , children:[
    {path:'viewusers' , element:<ViewUsers/>},
    {path:'dashboard' , element:<Dashboard/>},
  ]}
]
)

//const router = createBrowserRouter(routeDefinitions)

function App() {



  return (
    <>
    <ToastProvider>

    <RouterProvider router={router}>
    <Outlet /> 
    </RouterProvider>
    </ToastProvider>

    </>
    );
}

export default App;
