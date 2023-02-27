"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    constructor(App) {
        this.application = App;
    }
    handler() {
        return this.application.use(function (req, res, next) {
            res.status(404);
            res.format({
                default: function () {
                    res.send({ status: 404, message: "Page not found" });
                }
            });
        });
    }
}
exports.default = ErrorHandler;
