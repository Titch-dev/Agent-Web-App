import React from 'react';
import AgentsTab from './components/AgentsTab';
import AliasTab from './components/AliasTab';
import AgenciesTab from './components/AgenciesTab';
import LocationsTab from './components/LocationsTab';
import MissionsTab from './components/MissionsTab';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function App() {
    
  return(
    <div style={{background: "#f3f3f3"}}>
      <h1 className="text-center mb-5">Field Agent</h1>
      <Router>
          <ul class="nav nav-tabs justify-content-around">
              <li class="nav-item">
                  <Link to="/agents" class="nav-link active" href="#"><h2>Agents</h2></Link>
              </li>
              <li class="nav-item">
                  <Link to="/alias" class="nav-link" href="#"><h2>Alias</h2></Link>
              </li>
              <li class="nav-item">
                  <Link to="/agencies" class="nav-link" href="#"><h2>Agencies</h2></Link>
              </li>
              <li class="nav-item">
                  <Link to="/missions" class="nav-link" href="#"><h2>Missions</h2></Link>
              </li>
              <li class="nav-item">
                  <Link to="/locations" class="nav-link" href="#"><h2>Locations</h2></Link>
              </li>
          </ul>

          <Switch>
            <Route path="/agents">
              <AgentsTab />
            </Route>
            <Route path="/alias">
              <AliasTab />
            </Route>
            <Route path="/agencies">
              <AgenciesTab />
            </Route>
            <Route path="/missions">
              <MissionsTab />
            </Route>
            <Route path="/locations">
              <LocationsTab />
            </Route>
          </Switch>

      </Router>
      
    </div>
  );
}
  
export default App;
