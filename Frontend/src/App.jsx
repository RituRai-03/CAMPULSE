import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Admin from "./pages/Admin";

function App() {
  const path = window.location.pathname;

  return (
    <>
      <Navbar />

      {path === "/events" ? (
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