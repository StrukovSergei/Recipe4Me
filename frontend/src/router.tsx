import { Outlet, createBrowserRouter } from 'react-router-dom';
import AppHome from './pages/AppHome';
import AppSearch from './pages/AppSearch';
import AppFavourite from './pages/AppFavourite';
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
        path: '/favourites',
        element: <AppFavourite />,
    },
    {
        path: '/about',
        element: < AppAbout />,
    },

];

export const router = createBrowserRouter(routes);