function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("campulseUser")
  );

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