import {BrowserRouter, Route, Switch} from "react-router-dom";
import EntityViewer from './components/entity/EntityViewer'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <a href="/entity">entity</a>
          <a href="/calendar">calendar</a>
          <a href="/search">search</a>
          <Switch>
              <Route path="/entity">
                  <EntityViewer/>
              </Route>
              <Route path="/calendar">
                  {/*<Entity/>*/}
              </Route>
              <Route path="/search">
                  {/*<Entity/>*/}
              </Route>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
