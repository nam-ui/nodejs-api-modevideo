import { Request, Response, Send } from "express";
import { Schema, Types } from "mongoose";


export interface IComments {
   id_video: Types.ObjectId,
   map: [
      {
         f_id: Types.ObjectId,
         p_id: Types.ObjectId,
         id_user: Types.ObjectId,
         note: string,
         hash_user: string[],
         heart: number,
         timeWrite: number,
      }
   ]
}



