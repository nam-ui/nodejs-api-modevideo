import express from "express";
import MainRouter from "../index.interface";
import CommentsMongo from "./comments.dto";
import { treeComments } from "../../utils/CommentsDeep";
import { decode } from "jsonwebtoken";
import AccountMongo from "../auth/auth.dto";
import mongoose from "mongoose";
class CommentsService extends MainRouter {
    private constructor() {
        super();
    }
    static async getCommentsByIdVideo(req: express.Request, res: express.Response, next: express.NextFunction) {
        var set_p_id: string[] = [];
        var comments: any = await CommentsMongo.findOne({ id_video: req.params.id }).then(value => value);
        var customs_comments = await Promise.all(comments?.map.map(async (el: any) => {
            if (el.p_id) {
                if (!set_p_id.includes(new mongoose.Types.ObjectId(el.p_id).toString())) { set_p_id.push(new mongoose.Types.ObjectId(el.p_id).toString()) }
            }
            return {
                id: el._id,
                f_id: el.f_id,
                p_id: el.p_id,
                hash_user: el.hash_user,
                note: el.note,
                timeWrite: el.timeWrite,
                user: await AccountMongo.findById(el.id_user)
            }
        })).then(result => result);
        return res.status(200).send({ data: await treeComments(JSON.parse(JSON.stringify(customs_comments)), set_p_id) });
    }
    static async create(req: express.Request, res: express.Response, next: express.NextFunction) {
        var default_p_and_f_id = new mongoose.Types.ObjectId();
        var f_id = req.body.f_id;
        var p_id = req.body.p_id;
        if (!!!f_id) f_id = default_p_and_f_id;
        if (!!!p_id) p_id = default_p_and_f_id;
        if (!req.headers.authorization) return res.status(401).send({ access_token: false });
        const decodeToken = decode(req.headers.authorization) as unknown as { email: String, sub: String, email_verified: Boolean };
        var account = await AccountMongo.findOne({ email: decodeToken.email, sub: decodeToken.sub })
        var comment = await CommentsMongo.findOneAndUpdate({ id_video: req.body.id_video }, {
            $push: {
                map: {
                    f_id: f_id,
                    p_id: p_id,
                    id_user: account?.id,
                    hash_user: req.body.hash_user,
                    note: req.body.note,
                }
            }
        }).then(docs => {
            if (!!!docs) {
                const comment = new CommentsMongo({
                    id_video: req.body.id_video, map: {
                        f_id: f_id,
                        p_id: p_id,
                        id_user: account?.id,
                        hash_user: req.body.hash_user,
                        note: req.body.note,
                    }
                }).save();
                return comment;
            }
            return docs;
        });
        return res.status(200).send({ data: comment, message: `$ success`, });
    }
}
export default CommentsService;