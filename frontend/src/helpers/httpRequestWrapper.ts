import { useAuthStore } from "../stores/auth.store";

export const httpRequestWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE")
}

function request(requestType: string){
  return (url: string, body: any) => {
    const requestOptions = {
      requestType,
      headers: authHeader(url)
    };
    if(body) {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }
  }
}

function authHeader(url: string){
  const { user } = useAuthStore();
  const isLoggedIn = user.token;
  const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
  if(isLoggedIn && isApiUrl){
    return { Authorization: `Bearer ${user.token}`};
  } else {
    return {};
  }
}