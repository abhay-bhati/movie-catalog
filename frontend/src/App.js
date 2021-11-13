import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import Movies from "./components/Movies";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <AddMovie />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
