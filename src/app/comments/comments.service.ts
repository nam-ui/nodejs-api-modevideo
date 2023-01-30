import CommentsMongo from "./comments.dto";
import { IComments } from "./comments.interface";

export default class CommentsService {
    private constructor() { }

    static create() {
        return "id_comments"
    }
}