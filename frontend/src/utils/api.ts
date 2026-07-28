/**
 * Central API base URL configuration.
 * Uses NEXT_PUBLIC_API_URL env var in production (set in Vercel dashboard).
 * Falls back to localhost:8000 for local development.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
