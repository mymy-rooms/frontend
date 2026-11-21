import { createBrowserRouter } from "react-router";
import AppLayout from "./AppLayout";
import DiaryPage from "../pages/DiaryPage";
import ExplorePage from "../pages/ExplorePage";
import HomePage from "../pages/HomePage";
import MyPage from "../pages/MyPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "diary", Component: DiaryPage },
      { path: "explore", Component: ExplorePage },
      { path: "my", Component: MyPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
