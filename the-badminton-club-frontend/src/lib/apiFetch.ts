import { useAuth } from "../context/AuthContext";

/**
 * Centralised fetch helper that:
 * - attaches access token
 * - refreshes token on 401
 * - retries original request once
 */
export async function apiFetch(
  url: string,
  options: RequestInit = {},
  auth: ReturnType<typeof useAuth>,
  hasRefreshed = false
): Promise<Response> {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(auth.accessToken
        ? { Authorization: `Bearer ${auth.accessToken}` }
        : {}),
    },
    credentials: "include",
  });

  // ✅ Access token expired
  if (res.status === 401 && !hasRefreshed) {
    const refreshRes = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (refreshRes.ok) {
      const { accessToken } = await refreshRes.json();

      auth.setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);

      // ✅ Retry original request ONCE
      return apiFetch(url, options, auth, true);
    }

    // ❌ Refresh failed → force logout
    auth.logout();
    throw new Error("Session expired");
  }

  return res;
}