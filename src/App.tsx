import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Routing from "./routes/Routing";

const App = () => {
  return (
    <Router>
      <Routing />
    </Router>
  );
};

export default App;
