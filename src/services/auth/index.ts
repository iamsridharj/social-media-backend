import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import httpStatusCode from "http-status-codes";

import { successHandler } from "../../utils/responseHandlers/responseUtils";
import { BadRequest, ResourceNotFoundError } from "../../utils/errorHandlers/errorClasses";
import { INVALID_CREDENTIALS, DUPLICATE_USER_FOUND, BAD_REQUEST } from "../../utils/errorHandlers/errorKeys";


import User from "../../models/User";

const isExistingUser = async (searchObject) => {
    const isExistingUser = await User.find(searchObject).count();
    return isExistingUser > 0;
}

export const add = async (req, res, next) => {
    try {
        const { firstName, lastName, password, email } = req.body;
        if (!password || password?.length < 6) {
            throw new BadRequest('User:Create', undefined, 'Must provide a password of more than 6 characters', true, INVALID_CREDENTIALS);
        }
        const isExisting = await isExistingUser({ email });
        if (isExisting) {
            throw new BadRequest('User:Create', undefined, 'User already exists', true, DUPLICATE_USER_FOUND);
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ firstName, lastName, password: hashedPassword, email });
        await user.save();

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "24h",
            }
        );

        successHandler(res, "Successfully added", { ...user, token });
    } catch (e) {
        next(e)
    }
}

export const login = async (req, res, next) => {

    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            throw new BadRequest('User:Login', httpStatusCode.BAD_REQUEST, 'Must provide email and Password', true, BAD_REQUEST);
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (!user) {
            throw new ResourceNotFoundError('User:Login');
        }

        const isMatching = await bcrypt.compare(password, user.password)
        if (!isMatching) {
            throw new BadRequest('User:Login', httpStatusCode.UNAUTHORIZED, 'Invalid Credentials', true, INVALID_CREDENTIALS);
        }

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        successHandler(res, "", { ...user, token });

    } catch (err) {
        next(err);
    }


}