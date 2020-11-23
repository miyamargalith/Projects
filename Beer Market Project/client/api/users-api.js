import server from "./server";

export function createNewUser(userData) {
  return server.post("/api/users/signUp", userData).then(({ data }) => {
    return data;
  });
}

export function loginUser(userData) {
  return server.post("/api/users/signIn", userData);
}

export function checkSession() {
  return server.get("/api/users/signIn").then(({ data }) => {
    return data;
  });
}

export function logOutUser() {
  return server.get("/api/users/");
}

export function changeUserPassword(userData) {
  return server.post("/api/users/userPage", userData);
}
