import bcrypt from "bcrypt";

import httpStatusCode from "http-status-codes";

import { signJwt } from "../utils/signJwt";
import { successHandler } from "../utils/responseHandlers/responseUtils";
import { BadRequest, ResourceNotFoundError } from "../utils/errorHandlers/errorClasses";
import { INVALID_CREDENTIALS, DUPLICATE_USER_FOUND, BAD_REQUEST } from "../utils/errorHandlers/errorKeys";


import User from "../models/User.model";

const isExistingUser = async (searchObject) => {
    const isExistingUser = await User.find(searchObject).count();
    return isExistingUser > 0;
}

export const add = async (req, res, next) => {
    try {
        const { firstName, lastName, password, email, profileImage } = req.body;
        if (!password || password?.length < 6) {
            throw new BadRequest('User:Create', undefined, 'Must provide a password of more than 6 characters', true, INVALID_CREDENTIALS);
        }
        const isExisting = await isExistingUser({ email });
        if (isExisting) {
            throw new BadRequest('User:Create', undefined, 'User already exists', true, DUPLICATE_USER_FOUND);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, password: hashedPassword, email, profileImage });

        await user.save();
        await user.populate({
            path: "profileImage",
        });
        const useObj = user.toObject()
        const token = signJwt(user);
        successHandler(res, "Successfully added", { ...useObj, token });
    } catch (e) {
        next(e)
    }
}

export const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            throw new BadRequest('User:Login', httpStatusCode.BAD_REQUEST, 'Must provide email and Password', true, BAD_REQUEST);
        }
        const user = await User.findOne({ email });

        if (!user) {
            throw new ResourceNotFoundError('User:Login');
        }

        await user.populate({
            path: "profileImage",
        });
        const { password: hashedPassword, ...rest } = user.toObject()
        const isMatching = await bcrypt.compare(password, hashedPassword)
        if (!isMatching) {
            throw new BadRequest('User:Login', httpStatusCode.UNAUTHORIZED, 'Invalid Credentials', true, INVALID_CREDENTIALS);
        }
        const token = signJwt(user);
        successHandler(res, "", { ...rest, token });

    } catch (err) {
        next(err);
    }


}