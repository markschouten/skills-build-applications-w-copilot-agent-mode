import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>OctoFit Tracker</h1>
          <p>Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces API support.</p>
          <nav>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/activities">Activities</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/workouts">Workouts</NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Users />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
