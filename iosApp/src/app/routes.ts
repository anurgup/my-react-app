import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { AppPage } from "./pages/AppPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/app",
    Component: AppPage,
  },
]);
