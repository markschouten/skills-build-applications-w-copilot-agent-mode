import { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';

// API endpoint pattern: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
export default function Activities() {
  const { fetchJson, apiBaseUrl } = useApi('/api/activities/');
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchJson().then((data) => setActivities(data?.activities || data || []));
  }, [fetchJson]);

  return (
    <section>
      <h2>Activities</h2>
      <p>Using API base URL: {apiBaseUrl}</p>
      {activities.length ? (
        <ul>
          {activities.map((activity) => (
            <li key={activity._id || `${activity.user}-${activity.recordedAt}`}>
              {activity.type} by {activity.user?.name || 'Unknown'} — {activity.durationMinutes} min
            </li>
          ))}
        </ul>
      ) : (
        <p>No activities found.</p>
      )}
    </section>
  );
}
