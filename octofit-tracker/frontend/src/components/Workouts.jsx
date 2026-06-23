import { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';

// API endpoint pattern: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
export default function Workouts() {
  const { fetchJson, apiBaseUrl } = useApi('/api/workouts/');
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetchJson().then((data) => setWorkouts(data?.workouts || data || []));
  }, [fetchJson]);

  return (
    <section>
      <h2>Workouts</h2>
      <p>Using API base URL: {apiBaseUrl}</p>
      {workouts.length ? (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id || workout.name}>
              {workout.name} — {workout.difficulty}, {workout.durationMinutes} min
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts found.</p>
      )}
    </section>
  );
}
