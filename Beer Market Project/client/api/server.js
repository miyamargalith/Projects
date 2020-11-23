import axios from "axios";

const localServer = axios.create({
  headers: { common: { "x-platform": "Web" } }
});

localServer.setAccessToken = function(token) {
  this.defaults.headers.common.Authorization = `Bearer ${token}`;
};

localServer.clearAccessToken = function() {
  delete this.defaults.headers.common.Authorization;
};

export default localServer;
