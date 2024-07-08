import wishlistService from "../../services/post/wishlist.service";
import { successHandler } from "../../utils/responseHandlers/responseUtils";

const wishlistActions = async (req, res, next) => {
    try {
        const { postId } = req.query;
        const { userId } = req.user;
        const { action } = req.params;

        const wishlistDoc = await wishlistService.wishlistActions(postId, userId, action);
        if (wishlistDoc) {
            successHandler(res, "Successfully added to wishlist", wishlistDoc);
        } else {
            successHandler(res, "Wishlist action processed", {});
        }
    } catch (error) {
        next(error);
    }
};

export default {
    wishlistActions,
};
