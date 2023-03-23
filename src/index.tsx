import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import Navbar from "./Navbar";
import Movie from "./movie/movie";
import Projections from "./movieProjections/projectionsPage";
import Reviews from "./movieReview/reviewPage";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/AuthGuard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateRoute />}>
        <Route element={<App />} path="/" />
        <Route element={<Movie />} path="/movie/:id" />
        <Route path="/movie/:id/projections" element={<Projections />} />
        <Route path="/movie/:id/review" element={<Reviews />} />
      </Route>
      <Route element={<LoginForm />} path="/login" />
      <Route element={<RegisterForm />} path="/register" />
    </>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Navbar />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
