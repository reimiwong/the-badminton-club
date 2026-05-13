import { useAuth } from "../context/AuthContext";

let refreshPromise: Promise<string> | null = null;

/**
 * Centralised fetch helper that:
 * - attaches access token
 * - refreshes token on 401
 * - retries original request once
 * - prevents multiple simultaneous refresh calls
 */
export async function apiFetch(
  url: string,
  options: RequestInit = {},
  auth: ReturnType<typeof useAuth>,
  hasRetried = false
): Promise<Response> {
  const makeRequest = (token: string | null) =>
    fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

  let res = await makeRequest(auth.accessToken);

  // =========================
  // TOKEN EXPIRED → REFRESH
  // =========================
  if (res.status === 401 && !hasRetried) {
    try {
      // If refresh already in progress, reuse it
      if (!refreshPromise) {
        refreshPromise = fetch(
          `${import.meta.env.VITE_API_URL}/api/users/refresh`,
          {
            method: "POST",
            credentials: "include",
          }
        )
          .then(async (r) => {
            if (!r.ok) throw new Error("Refresh failed");
            const data = await r.json();
            return data.accessToken as string;
          })
          .then((newToken) => {
            auth.setAccessToken(newToken);
            localStorage.setItem("accessToken", newToken);
            return newToken;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newToken = await refreshPromise;

      // retry original request once with new token
      res = await makeRequest(newToken);

      // if still failing → stop
      if (res.status === 401) {
        auth.logout();
      }

      return res;
    } catch {
      // refresh truly failed (expired refresh token, etc.)
      auth.logout();
      throw new Error("Session expired");
    }
  }

  return res;
}