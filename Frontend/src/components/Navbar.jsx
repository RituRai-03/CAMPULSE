import { useEffect, useState } from "react";

function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("campulseUser")
  );

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("campulseTheme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle(
      "dark-mode",
      darkMode
    );

    localStorage.setItem(
      "campulseTheme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("campulseUser");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">

      <div className="logo">
        CAMPULSE
      </div>

      <div className="nav-links">

        <a href="/">
          Home
        </a>

        <a href="/events">
          Events
        </a>

        {user?.role === "admin" && (
          <a href="/admin">
            Dashboard
          </a>
        )}

        {user?.role === "student" && (
          <a href="/my-registrations">
            My Registrations
          </a>
        )}

<label className="theme-switch">
  <input
    type="checkbox"
    checked={darkMode}
    onChange={() => {
      setDarkMode((previous) => !previous);
    }}
  />

  <span className="theme-slider">
    <span className="theme-icon">
      {darkMode ? "☾" : "☀"}
    </span>
  </span>
</label>
        {!user ? (
          <a href="/login">
            Login
          </a>
        ) : (
          <>
            <span className="nav-user">
              {user.name}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;