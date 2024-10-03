import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import routes from "./routes/routes";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import VerifyOtp from "./pages/auth/VerifyOtp";
import NewPassword from "./pages/auth/NewPassword";
import ProtectedRoute from "./utilities/ProtectedRoute";

function App() {
  return (
    <>
      <ToastContainer />
      <ChakraProvider>
        <Router>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route exact path="/verify-otp" element={<VerifyOtp />} />
            <Route exact path="/new-password" element={<NewPassword />} />
            {routes.map((routes, index) => {
              const { path, component: Component } = routes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <ProtectedRoute Component={Component} />
                    </Suspense>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
}

export default App;
