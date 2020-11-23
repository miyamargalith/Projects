import server from "./server";

export function getAllBeers() {
  return server.get("/api/beers").then(({ data }) => {
    return data;
  });
}
