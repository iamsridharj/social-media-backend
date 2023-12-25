import { ResourceNotFoundError } from "../../utils/errorHandlers/errorClasses";
import PostModel from "../../models/Post.model";
import WishlistModel from "../../models/Wishlist.model";
import { successHandler } from "../../utils/responseHandlers/responseUtils";

const addToWishlist = async (req, res, next) => {
    try {
        const { postId } = req.query;
        const { userId } = req.user;
        const { action } = req.params;

        const isAddingToWish = action === "add";

        if (isAddingToWish) {
            const postDoc = await PostModel.findById(postId);
            if (!postDoc) {
                throw new ResourceNotFoundError("Comment:addComment")
            }
            const wishlistDoc = await new WishlistModel({
                author: userId,
                postId,
            });
            await wishlistDoc.save();
            successHandler(res, "Successfully added to wishlist", wishlistDoc)
        }
        next()
    } catch (error) {
        next(error)
    }
}


export default {
    addToWishlist,
}