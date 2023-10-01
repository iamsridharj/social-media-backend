import express from "express";
import apiRoutes from "./api";

import * as errorUtils from "./utils/errorHandlers/errorUtils";
import mongoConn from "./utils/db/dbClient";


mongoConn.init();

const app = express();

app.use(express.json());

app.use("/api", apiRoutes)
app.use(errorUtils.returnError)


export default app;