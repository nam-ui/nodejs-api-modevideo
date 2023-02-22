import { Request, Response, Send } from "express";
import { Schema, Types } from "mongoose";


export interface IComments {
   id_video: Types.ObjectId,
   map: [
      {
         author: Types.ObjectId,
         note: string,
         hash_user: string[],
         from: Types.ObjectId,
         heart: number,
         timeWrite: number,
      }
   ]
}


