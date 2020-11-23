const mongoose = require("mongoose");
mongoose.set("debug", false);
function boot() {
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
  });
}

function shutdown() {
  mongoose.connection.close();
}

module.exports = {
  boot,
  shutdown
};
