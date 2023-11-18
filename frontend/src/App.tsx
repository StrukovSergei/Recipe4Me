import { RouterProvider, } from "react-router-dom";

import { router } from './router'
import AppHeader from "./components/AppHeader";



const App = () => {


  return (
    <>

        <AppHeader/>
      <RouterProvider router={router} />


      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Recipe4Me</p>
      </footer>
    </>
  );
};


export default App;

