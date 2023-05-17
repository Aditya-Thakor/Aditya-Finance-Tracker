import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { routing as Routes } from "./routes/routing";

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
