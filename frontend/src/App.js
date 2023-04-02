import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "./appLayout/AppLayout";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import RequireAuth from "./component/RequireAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* Not Match */}
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
