import { ResourceNotFoundError } from "../../utils/errorHandlers/errorClasses";
import PostModel from "../../models/Post.model";
import WishlistModel from "../../models/Wishlist.model";

const addToWishlist = async (postId, userId, action) => {
    const isAddingToWish = action === "add";

    if (isAddingToWish) {
        const postDoc = await PostModel.findById(postId);
        if (!postDoc) {
            throw new ResourceNotFoundError("Wishlist:addToWishlist");
        }
        const wishlistDoc = new WishlistModel({
            author: userId,
            postId,
        });
        await wishlistDoc.save();
        return wishlistDoc;
    }
};

export default {
    addToWishlist,
};
