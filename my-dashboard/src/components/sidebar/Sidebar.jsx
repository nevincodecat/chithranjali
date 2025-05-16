import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: "bi-justify" },
    { name: "Add Income", path: "/add-income", icon: "bi-cash-coin" },
    { name: "Income Records", path: "/income-records", icon: "bi-eye-fill" },
    { name: "Add Expense", path: "/add-expense", icon: "bi bi-coin" },
    { name: "Expense Records", path: "/expense-records", icon: "bi-eye-fill" },
    // { name: "Calendar", path: "/calendar", icon: "bi bi-calendar2-week-fill" },
    // { name: "Reports", path: "/reports", icon: "bi bi-file-earmark-text-fill" },
    // { name: "Settings", path: "/settings", icon: "bi bi-screwdriver" },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>CHITHRANJALI</div>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`${styles.link} ${
              location.pathname === item.path ? styles.activeLink : ""
            }`}
          >
            {/* Render the icon if it exists */}
            {item.icon && (
              <i className={`bi ${item.icon} ${styles.linkIcon}`}></i> // Apply the linkIcon class
            )}
            {item.name}
          </Link>
        ))}
      </nav>
      <div className={styles.userToggle}>👤 User</div>
    </div>
  );
};

export default Sidebar;
