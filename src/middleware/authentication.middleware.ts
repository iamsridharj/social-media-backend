import httpStatusCode from "http-status-codes";
import { successHandler } from "../utils/responseHandlers/responseUtils";
import { BadRequest } from "../utils/errorHandlers/errorClasses";
import { INVALID_CREDENTIALS, UNAUTHORIZED } from "../utils/errorHandlers/errorKeys";
import UserModel from "../models/User.model";

const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = async (req, res, next) => {
    try {
        const token =
            req.body.token || req.query.token || req.headers["authorization"];

        if (!token) {
            throw new BadRequest("middleware:verifyToken", httpStatusCode.UNAUTHORIZED, "Invalid token", true, UNAUTHORIZED)
        }
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        const user = await UserModel.findOne({ email: decoded.email })
        console.log(decoded, user)
        if (user) {
            req.user = {
                userId: user._id,
                email: user.email
            };
        } else {
            throw new BadRequest("middleware:verifyToken", httpStatusCode.UNAUTHORIZED, "User is not registered", true, UNAUTHORIZED)
        }
    } catch (err) {
        return next(err);
    }
    return next();
};

export default verifyToken;
