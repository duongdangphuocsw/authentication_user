import "./App.css";
import "./App.scss";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Router } from "react-router-dom";
import PrivateRouter from "./components/PrivateRoute/PrivateRouter";
function App() {
  return (
    <div className="App">
      <div className="login__container">
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route
            path="profile"
            element={
              <PrivateRouter>
                <Profile />
              </PrivateRouter>
            }
          />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
}

export default App;
