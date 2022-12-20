import { Express } from "express";
export default class ErrorHandler {
    application: Express;
    constructor(App: Express) {
        this.application = App;
    }
    handler() {
        return this.application.use(function (req, res, next) {
            res.status(404);
            res.format({
                default: function () {
                    res.send({status: 404, message: "Page not found"})
                }
            })
        })
    }
}