import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { App, Menu } from 'antd';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider
} from "react-router-dom";
import "./App.module.scss";
import UserPage from './screen/user.page';



const items: MenuProps['items'] = [
  {
    label: <Link to={"/"}>Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to={"/users"} > Manage Users</Link>,
    key: 'users',
    icon: <UserOutlined />,
  }
];
const Header = () => {
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items} />
  )
}
  ;
const LayoutAdmin = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <App /> },
      {
        path: "users",
        element: <UserPage />,
      }],
  },

]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
