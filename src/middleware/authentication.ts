import httpStatusCode from "http-status-codes";
import { successHandler } from "../utils/responseHandlers/responseUtils";
import { BadRequest } from "../utils/errorHandlers/errorClasses";
import { INVALID_CREDENTIALS, UNAUTHORIZED } from "../utils/errorHandlers/errorKeys";

const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["authorization"];


    if (!token) {
        throw new BadRequest("middleware:verifyToken", httpStatusCode.UNAUTHORIZED, "Invalid token", true, UNAUTHORIZED)
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return next(err);
    }
    return next();
};

export default verifyToken;
