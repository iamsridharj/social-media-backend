import express from "express";
import apiRoutes from "./api";

import * as errorUtils from "./utils/errorHandlers/errorUtils";
import mongoClient from "./utils/mongo/mongoClient";

const app = express();

app.use(express.json());

app.use("/api", apiRoutes)
app.use(errorUtils.returnError)


export default app;