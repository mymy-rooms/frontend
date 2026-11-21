import { Outlet } from "react-router";
import BottomNavigation from "../components/BottomNavigation";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <Outlet />
      <BottomNavigation />
    </div>
  );
}
