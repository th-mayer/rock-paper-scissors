import { useAuthStore } from "../stores/auth.store";

interface RequestOptions {
  method: string;
  headers: Headers;
  body?: any;
}

// Wrapper for browser built in fetch() method
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
export const fetchWrapper = {
  get: makeRequest("GET"),
  post: makeRequest("POST"),
  put: makeRequest("PUT"),
  delete: makeRequest("DELETE"),
};

function makeRequest(requestType: string) {
  return (url: string, body?: any) => {
    const requestOptions: RequestOptions = {
      method: requestType,
      headers: authHeader(url),
    };
    if (body) {
      requestOptions.headers.append("Content-Type", "application/json");
      requestOptions.body = JSON.stringify(body);
    }
    return fetch(url, requestOptions).then(handleResponse);
  };
}

function authHeader(url: string): Headers {
  const { user } = useAuthStore();
  const isLoggedIn = !!user?.token;
  const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
  const headers = new Headers();
  if (isLoggedIn && isApiUrl) {
    headers.append("Authorization", `Bearer ${user.token}`);
  }
  return headers;
}

async function handleResponse(response: Response) {
  const isJson = response.headers
    ?.get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const { user, logout } = useAuthStore();
    if ([401, 403].includes(response.status) && user) {
      logout();
    }
    const error = (data && data.message) || response.status;
    return Promise.reject(error);
  }
  return data;
}
