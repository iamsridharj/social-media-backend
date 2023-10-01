import jwt from "jsonwebtoken";

export const signJwt = (user) => {
    return jwt.sign(
        { user_id: user._id, email: user.email },
        process.env.TOKEN_KEY,
        {
            expiresIn: "24h",
        }
    );
}