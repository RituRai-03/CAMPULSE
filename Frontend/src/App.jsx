import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyRegistrations from "./pages/MyRegistrations";

function App() {

  const path = window.location.pathname;

  const user = JSON.parse(
    localStorage.getItem("campulseUser")
  );


  // =========================
  // ADMIN PROTECTION
  // =========================

  if (path === "/admin") {

    if (
      !user ||
      user.role !== "admin"
    ) {
      window.location.href = "/login";
      return null;
    }

  }


  // =========================
  // STUDENT PROTECTION
  // =========================

  if (path === "/my-registrations") {

    if (
      !user ||
      user.role !== "student"
    ) {
      window.location.href = "/login";
      return null;
    }

  }


  return (
    <>
      <Navbar />

      {path === "/login" ? (

        <Login />

      ) : path === "/register" ? (

        <Register />

      ) : path === "/events" ? (

        <Events />

      ) : path === "/event" ? (

        <EventDetails />

      ) : path === "/my-registrations" ? (

        <MyRegistrations />

      ) : path === "/admin" ? (

        <Admin />

      ) : (

        <Home />

      )}

    </>
  );
}

export default App;