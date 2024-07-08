import { ResourceNotFoundError } from "../../utils/errorHandlers/errorClasses";
import PostModel from "../../models/Post.model";
import WishlistModel from "../../models/Wishlist.model";

const wishlistActions = async (postId, userId, action) => {
    const postDoc = await PostModel.findById(postId).lean();
    if (!postDoc) {
        throw new ResourceNotFoundError("Wishlist:wishlistActions");
    }

    if (action === "add") {
        const wishlistDoc = new WishlistModel({
            author: userId,
            postId,
        });
        await wishlistDoc.save();
        return wishlistDoc;
    } else if (action === "remove") {
        const wishlistDoc = await WishlistModel.findOneAndDelete({ postId, author: userId }).lean();
        if (!wishlistDoc) {
            throw new ResourceNotFoundError("Wishlist:wishlistActions: Item not found in wishlist");
        }
        return wishlistDoc;
    } else {
        throw new Error("Wishlist:wishlistActions: Invalid action");
    }
};

export default {
    wishlistActions,
};
