import { Request, Response, Send } from "express";

export interface IAccount {
    name: string;
    readonly email: string;
    avatar?: string;
    roles: [string],
    refreshToken: string,
    isByPartyGoogle: false,
    isByPartyFacebook: false
}
export interface IAccountReq {
    name: string;
    email: string;
}


