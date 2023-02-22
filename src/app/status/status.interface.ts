import { Request, Response, Send } from "express";
export interface IStatus {
    readonly only_view: 'Công khai' | 'Bạn bè' | 'Riêng tư';
    readonly access_user: [String],
    readonly view: Number,
    readonly heart: Number,
    
}
