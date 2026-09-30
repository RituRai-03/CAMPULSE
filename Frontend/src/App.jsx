import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

function App() {
  const path = window.location.pathname;

  const user = JSON.parse(
    localStorage.getItem("campulseUser")
  );

  // =========================
  // PROTECT ADMIN
  // =========================

  if (path === "/admin") {
    if (!user || user.role !== "admin") {
      window.location.href = "/login";
      return null;
    }
  }

  return (
    <>
      <Navbar />

      {path === "/login" ? (
        <Login />
      ) : path === "/events" ? (
        <Events />
      ) : path === "/event" ? (
        <EventDetails />
      ) : path === "/admin" ? (
        <Admin />
      ) : (
        <Home />
      )}
    </>
  );
}

export default App;