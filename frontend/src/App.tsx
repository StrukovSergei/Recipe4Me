import { RouterProvider, } from "react-router-dom";

import { router } from './router'
import "./App.css"



const App = () => {


  return (
    <>


      <RouterProvider router={router} />


      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Recipe4Me</p>
      </footer>
    </>
  );
};


export default App;

