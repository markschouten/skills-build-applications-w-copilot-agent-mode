import { useCallback } from 'react';

const buildApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  // Safe Codespaces-hosted base when available
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  // Local development fallback
  return 'http://localhost:8000';
};

export default function useApi(resource) {
  const apiBaseUrl = buildApiBaseUrl();
  // Ensure single-slash joining and include trailing slash per API expectations
  const normalizedBase = apiBaseUrl.replace(/\/$/, '');
  // Allow callers to pass either a bare resource name ("activities")
  // or a full API path ("/api/activities/"). Normalize to a single
  // final URL under the base (which does not include /api).
  let path = String(resource || '').replace(/^\/+|\/+$/g, '');
  if (!/^api\//i.test(path)) {
    path = `api/${path}`;
  }
  const url = `${normalizedBase}/${path}/`;

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
    apiBaseUrl: `${normalizedBase}/api/`,
    url,
    fetchJson,
  };
}
