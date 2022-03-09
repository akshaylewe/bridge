import "./App.css";

import Card from "./Modules/Card/Card";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Tile__homepage /> */}
        {/* <Switch> */}
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/card" element={<Card />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
