import { Outlet, createBrowserRouter } from 'react-router-dom';
import AppHome from './pages/AppHome';
import AppSearch from './pages/AppSearch';
import AppFavourite from './pages/AppFavourite';
import RecipeDetails from './pages/RecipeDetails';
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
        path: '/recipe/:id', 
        element: <RecipeDetails />,
    },
    {
        path: '/about',
        element: < AppAbout />,
    },

];

export const router = createBrowserRouter(routes);