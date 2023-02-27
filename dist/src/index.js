"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runningID = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const query_string_1 = __importDefault(require("query-string"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const uuid_1 = require("uuid");
const ngrok_1 = __importDefault(require("ngrok"));
const auth_controller_1 = __importDefault(require("./app/auth/auth.controller"));
const comments_controller_1 = __importDefault(require("./app/comments/comments.controller"));
const esSearch_controller_1 = __importDefault(require("./app/esSearch/esSearch.controller"));
const map_controller_1 = __importDefault(require("./app/map/map.controller"));
const auth_1 = require("./app/middleware/auth");
const reviews_controller_1 = __importDefault(require("./app/reviews/reviews.controller"));
const video_controller_1 = __importDefault(require("./app/video/video.controller"));
const init_1 = __importDefault(require("./init"));
const cloudinary_1 = __importDefault(require("./plugins/cloudinary"));
const swagger_1 = __importDefault(require("./plugins/swagger"));
const ErrorHandler_1 = __importDefault(require("./utils/ErrorHandler"));
dotenv_1.default.config();
exports.runningID = (0, uuid_1.v4)();
ngrok_1.default.authtoken("2IS9drElwldbiKKPDSyrA83H41i_uRK6LhiQbJPUiM2CYpbc");
const url = ngrok_1.default.connect(8080);
init_1.default.getInstance();
cloudinary_1.default.getInstance();
esSearch_controller_1.default.getInstance();
const app = (0, express_1.default)();
if (process.env.NODE_ENV == 'test') {
    app.use((0, morgan_1.default)(':status :method :url :response-time', { skip: function (req, res) { return res.statusCode < 400; } }));
}
if (process.env.NODE_ENV_ACCESS_TOKEN_SECRET) {
    app.use((0, express_session_1.default)({
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
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "15gb" }));
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup((0, swagger_jsdoc_1.default)(swagger_1.default)));
app.use((0, cors_1.default)({
    origin: "*",
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
}));
app.use('/static/images', express_1.default.static(path_1.default.join(__dirname, 'public/images')));
app.get('/', async (req, res) => {
    res.send(`running id: ${exports.runningID}\nrunning on https: ${await url}`);
});
app.engine('.html', require('ejs').__express);
app.set('views', path_1.default.join(__dirname, 'templates'));
app.set('view engine', 'html');
app.get('/loginfb', function (req, res) {
    const stringifiedParams = query_string_1.default.stringify({
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
    const stringifiedParams = query_string_1.default.stringify({
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
const auth = new auth_controller_1.default(app, "/auth");
const review = new reviews_controller_1.default(app, "/reviews");
const video = new video_controller_1.default(app, "/video");
const map = new map_controller_1.default(app, "/map");
const comments = new comments_controller_1.default(app, "/comments");
auth.start();
review.start();
video.start();
map.start();
comments.start();
(0, auth_1.catchToken)(app);
new ErrorHandler_1.default(app).handler();
exports.default = app;
