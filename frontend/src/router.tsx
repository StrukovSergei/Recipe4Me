import { Outlet, createBrowserRouter } from 'react-router-dom';
import AppAbout from './pages/AppAbout';

const routes = [
    {
     path: '/about',
     element: < AppAbout />,

    },

   ];

   export const router = createBrowserRouter(routes);