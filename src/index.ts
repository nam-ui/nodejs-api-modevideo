import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';
import logger from "morgan";
import path from "path";
import helmet from "helmet";
import session from "express-session";
import queryString from "query-string";
import swaggerJsdoc from "swagger-jsdoc";
import swagger from 'swagger-ui-express';
import express_file from "express-fileupload";

import ErrorHandler from "./utils/ErrorHandler";
import Mongoose from "./plugins/mongoose";
import AuthController from "./app/auth/auth.controller"
import CloudinaryController from './plugins/cloudinary';
import EsSearchController from './app/esSearch/esSearch.controller';
import SwaggerJsOptions from "./plugins/swagger";
import ReviewController from './app/reviews/reviews.controller';
import VideoController from './app/video/video.controller';
import MapController from './app/map/map.controller';
import SnapShot from './init';
import { catchToken } from './app/middleware/auth';
dotenv.config();

export const runningID: Readonly<ReturnType<typeof uuidv4>> = uuidv4();
SnapShot.getInstance();
CloudinaryController.getInstance();
EsSearchController.getInstance();

const app: Express = express();
if (process.env.NODE_ENV == 'test') { app.use(logger(':status :method :url :response-time', { skip: function (req, res) { return res.statusCode < 400 } })) }

if (process.env.NODE_ENV_ACCESS_TOKEN_SECRET) {
  app.use(session({
    secret: process.env.NODE_ENV_ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
  }));
}

// app.use(
//   helmet({
//     referrerPolicy: { policy: "no-referrer" },
//     contentSecurityPolicy: false,
//   })
// );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "15gb" }));
app.use(express_file({
  limits: { fileSize: 50 * 1024 * 1024 },
}));


app.use('/api-docs', swagger.serve, swagger.setup(swaggerJsdoc(SwaggerJsOptions)));
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true,
}));


app.use('/static/images', express.static(path.join(__dirname, 'public/images')));
app.get('/', (req: Request, res: Response) => {
  res.send(`running id: ${runningID}`);
});
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'html');
app.get('/loginfb', function (req, res) {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.NODE_ENV_FB_APP_ID,
    redirect_uri: process.env.NODE_ENV_FB_APP_REDIRECT_URL,
  });
  const facebookLoginUrl = `https://www.facebook.com/v15.0/dialog/oauth?${stringifiedParams}`;
  res.render('loginFacebook', {
    logginFb: facebookLoginUrl,
    title: "EJS example",
    header: "Some users"
  });
});
app.get('/logingoogle', function (req, res) {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.NODE_ENV_GOOGLE_APP_ID,
    redirect_uri: "https://107b-14-180-184-110.ap.ngrok.io/auth/o/google",
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', "openid",
    ].join(' '),
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
  });
  const logginGoogle = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
  res.render('loginGoogle', {
    logginGoogle: logginGoogle,
    title: "EJS example",
    header: "Some users"
  });
});
const auth = new AuthController(app, "/auth");
const review = new ReviewController(app, "/reviews");
const video = new VideoController(app, "/video");
const map = new MapController(app, "/map");

auth.start();
review.start();
video.start();
map.start();
catchToken(app);

new ErrorHandler(app).handler();


export default app;