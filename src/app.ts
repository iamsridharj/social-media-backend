import express from "express";
import cors from "cors";
import apiRoutes from "./api";

import * as errorUtils from "./utils/errorHandlers/errorUtils";
import mongoClient from "./utils/mongo/mongoClient";

const app = express();
app.use(cors())

app.use(express.json());

app.use("/api", apiRoutes)
app.use(errorUtils.returnError)


export default app;