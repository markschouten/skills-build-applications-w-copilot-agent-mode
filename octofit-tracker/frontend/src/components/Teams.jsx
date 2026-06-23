import { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';

export default function Teams() {
  const { fetchJson, apiBaseUrl } = useApi('teams');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchJson().then((data) => setTeams(data?.teams || data || []));
  }, [fetchJson]);

  return (
    <section>
      <h2>Teams</h2>
      <p>Using API base URL: {apiBaseUrl}</p>
      {teams.length ? (
        <ul>
          {teams.map((team) => (
            <li key={team._id || team.name}>
              {team.name} — {team.description} ({team.members?.length || 0} members)
            </li>
          ))}
        </ul>
      ) : (
        <p>No teams found.</p>
      )}
    </section>
  );
}
