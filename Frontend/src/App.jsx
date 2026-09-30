import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";

function App() {
  const path = window.location.pathname;

  return (
    <>
      <Navbar />

      {path === "/events" ? (
        <Events />
      ) : path === "/event" ? (
        <EventDetails />
      ) : (
        <Home />
      )}
    </>
  );
}

export default App;