import { useCallback } from 'react';

const buildApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
};

export default function useApi(resource) {
  const apiBaseUrl = buildApiBaseUrl();
  const url = `${apiBaseUrl}/${resource}`;

  const fetchJson = useCallback(async () => {
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      console.error('API fetch error:', error);
      return null;
    }
  }, [url]);

  return {
    apiBaseUrl,
    url,
    fetchJson,
  };
}
