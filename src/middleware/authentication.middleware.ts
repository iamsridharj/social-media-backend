import httpStatusCode from "http-status-codes";
import { BadRequest } from "../utils/errorHandlers/errorClasses";
import {  UNAUTHORIZED } from "../utils/errorHandlers/errorKeys";
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

export const getInfoFromToken = async (req, res, next) => {
    try {
        const token =
            req.body.token || req.query.token || req.headers["authorization"];

        if (!token) {
            return next();
        }
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        const user = await UserModel.findOne({ email: decoded.email })
        if (user) {
            req.user = {
                userId: user._id,
                email: user.email
            };
        }
    } catch (err) {
        return next(err);
    }
    return next();
};

export default verifyToken;
