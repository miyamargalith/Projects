import server from "./server";

export function getAllActivities() {
  return server.get("/api/activities/admin").then(({ data }) => {
    return data;
  });
}

export function getUserCheckout(userEmail) {
  return server.post("/api/activities/userPage", userEmail).then(({ data }) => {
    return data;
  });
}

export function createNewActivity(activityData) {
  return server.post("/api/activities", activityData).then(({ data }) => {
    return data;
  });
}
