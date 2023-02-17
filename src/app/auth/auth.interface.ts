import { Request, Response, Send } from "express";
import { Types } from "mongoose";

export interface IAccount {
    readonly email: string;
    readonly family_name: string;
    readonly given_name: string;
    readonly picture: string;
    readonly roles: string[],
    readonly sub: string;
    readonly byParty: string[],
    readonly iat: Number,

    readonly id_tokens: Types.ObjectId;
    readonly id_files: Types.ObjectId;

}
export interface IAccountReq {
    name: string;
    email: string;
}


