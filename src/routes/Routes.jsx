import { createBrowserRouter, Outlet } from "react-router";
import ErrorPage from "../components/project-components/error-page/ErrorPage";
import WebsiteLayout from "../components/project-components/Layouts/WebsiteLayout";
import HomePage from "../components/project-components/home-page/HomePage";
import AuthLayouts from "../components/project-components/Layouts/AuthLayouts";
import SingUp from "../components/project-components/auth/signup/SingUp";
import Contact from "../components/project-components/contact/Contact";
import MainPage from "../components/project-components/main-page/MainPage";
import Login from "../components/project-components/auth/login/LogIn";
import CheckEmail from "../components/project-components/auth/reset-password/CheckEmail";
import CheckCode from "../components/project-components/auth/reset-password/CheckCode";
import ResetPassword from "../components/project-components/auth/reset-password/ResetPassword";
import ValidationCode from "../components/project-components/auth/signup/ValidationCode";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Outlet />,
    children: [
      //App
      {
        element: <WebsiteLayout />,
        children: [
          {
            // index: true,
            element: <MainPage />,
            children: [
              {
                index: true,
                element: <HomePage />,
              },
              {
                path: "contact",
                element: <Contact />,
              },
            ],
          },
        ],
      },

      // Auth
      {
        element: <AuthLayouts />,
        children: [
          {
            path: "log-in",
            element: <Login />,
          },
          {
            path: "sign-up",
            element: <SingUp />,
          },
          {
            path: "checkEmail",
            element: <CheckEmail />,
          },
          {
            path: "checkCode",
            element: <CheckCode />,
          },
          {
            path: "resetPassword",
            element: <ResetPassword />,
          },
          {
            path: "validationCode",
            element: <ValidationCode />,
          },
        ],
      },
    ],
  },
]);
