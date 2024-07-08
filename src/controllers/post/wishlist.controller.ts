import wishlistService from "../../services/post/wishlist.service";
import { successHandler } from "../../utils/responseHandlers/responseUtils";

const addToWishlist = async (req, res, next) => {
    try {
        const { postId } = req.query;
        const { userId } = req.user;
        const { action } = req.params;

        const wishlistDoc = await wishlistService.addToWishlist(postId, userId, action);
        successHandler(res, "Successfully added to wishlist", wishlistDoc);
    } catch (error) {
        next(error);
    }
};

export default {
    addToWishlist,
};
