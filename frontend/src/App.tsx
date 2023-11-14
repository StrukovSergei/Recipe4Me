import { RouterProvider } from "react-router-dom";

import { router } from './router'



const App = () => {


  return (
    <>
      <header>
        app header

      </header>
      <RouterProvider router={router} />

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Recipe4Me</p>
      </footer>
    </>
  );
};


export default App;

