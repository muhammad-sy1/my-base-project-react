import { createBrowserRouter, Outlet } from "react-router";
import ErrorPage from "../components/project-components/error-page/ErrorPage";
import WebsiteLayout from "../components/project-components/Layouts/WebsiteLayout";
import HomePage from "../components/project-components/home-page/HomePage";
import AuthLayouts from "../components/project-components/Layouts/AuthLayouts";
import Login from "../components/project-components/auth/login/Login";
import SingUp from "../components/project-components/auth/signup/SingUp";
import Contact from "../components/project-components/contact/Contact";
import MainPage from "../components/project-components/main-page/MainPage";

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
            path: "sing-up",
            element: <SingUp />,
          },
        ],
      },
    ],
  },
]);
