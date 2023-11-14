import { Outlet, createBrowserRouter } from 'react-router-dom';
import AppHome from './pages/AppHome';
import AppAbout from './pages/AppAbout';

const routes = [
    {
        path: '/',
        element: <AppHome />,
    },
    {
        path: '/about',
        element: < AppAbout />,
    },

];

export const router = createBrowserRouter(routes);