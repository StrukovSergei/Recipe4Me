import { Outlet, createBrowserRouter } from 'react-router-dom';
import AppHome from './pages/AppHome';
import AppSearch from './pages/AppSearch';
import AppAbout from './pages/AppAbout';

const routes = [
    {
        path: '/',
        element: <AppHome />,
    },
    {
        path: '/search',
        element: <AppSearch />,
    },
    {
        path: '/about',
        element: < AppAbout />,
    },

];

export const router = createBrowserRouter(routes);