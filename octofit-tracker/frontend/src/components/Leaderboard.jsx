import { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';

// API endpoint pattern: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
export default function Leaderboard() {
  const { fetchJson, apiBaseUrl } = useApi('/api/leaderboard/');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchJson().then((data) => setLeaderboard(data?.leaderboard || data || []));
  }, [fetchJson]);

  return (
    <section>
      <h2>Leaderboard</h2>
      <p>Using API base URL: {apiBaseUrl}</p>
      {leaderboard.length ? (
        <ol>
          {leaderboard.map((entry) => (
            <li key={entry._id || entry.user?._id || entry.rank}>
              {entry.rank}. {entry.user?.name || 'User'} — {entry.score} points
            </li>
          ))}
        </ol>
      ) : (
        <p>No leaderboard data found.</p>
      )}
    </section>
  );
}
