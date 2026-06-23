import { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';

export default function Users() {
  const { fetchJson, apiBaseUrl } = useApi('/api/users/');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchJson().then((data) => setUsers(data?.users || data || []));
  }, [fetchJson]);

  return (
    <section>
      <h2>Users</h2>
      <p>Using API base URL: {apiBaseUrl}</p>
      {users.length ? (
        <ul>
          {users.map((user) => (
            <li key={user._id || user.email || user.id}>
              {user.name} — {user.email} ({user.role})
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </section>
  );
}
