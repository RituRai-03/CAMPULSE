function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        CAMPULSE
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/events">Events</a>
        <a href="/admin">Admin</a>
      </div>
    </nav>
  );
}

export default Navbar;