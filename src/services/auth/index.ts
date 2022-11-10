import bcrypt from "bcrypt";
import { successHandler } from "../../utils/responseHandlers/responseUtils";
import { BadRequest } from "../../utils/errorHandlers/errorClasses";
import { INVALID_PASSWORD, DUPLICATE_USER_FOUND } from "../../utils/errorHandlers/errorKeys";

import User from "../../models/User";

const isExistingUser = async (searchObject) => {
    const isExistingUser = await User.find(searchObject).count();
    return isExistingUser > 0;
}

export const add = async (req, res, next) => {
    try{
        const {firstName, lastName, password, email} = req.body;
        if(!password || password?.length < 6){
            throw new BadRequest('User:Create', undefined, 'Must provide a password of more than 6 characters', true, INVALID_PASSWORD);
        }
        const isExisting = await isExistingUser({email});
        if(isExisting){
            throw new BadRequest('User:Create', undefined, 'User already exists', true, DUPLICATE_USER_FOUND);
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({firstName, lastName, password: hashedPassword, email});
        await user.save();
        successHandler(res, "Successfully added", user);
    } catch(e){
        next(e)
    }
}

export const login = (req, res, next) => {
    
}