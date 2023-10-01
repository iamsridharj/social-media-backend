import config from "./config/config";
import app from "./app";

app
  .listen(config.PORT, () => console.log(`Server listening on port: ${config.PORT}`))
  .on("error", (e) => console.log(`Error while starting the server`, e));