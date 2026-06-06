// Base URL for API requests.
// In production (same-origin), VITE_API_URL is empty so we use relative paths.
// In development, defaults to the local backend server.
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
