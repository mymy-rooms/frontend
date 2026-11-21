import { NavLink } from "react-router";
import Icon from "../common/Icon";

const navItems = [
  { label: "홈", icon: "home", to: "/" },
  { label: "기록", icon: "book", to: "/diary" },
  { label: "둘러보기", icon: "search", to: "/explore" },
  { label: "마이", icon: "user", to: "/my" },
];

export default function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="주요 메뉴">
      <div className="bottom-nav__inner">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="bottom-nav__icon">
              <Icon name={item.icon} />
            </span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
