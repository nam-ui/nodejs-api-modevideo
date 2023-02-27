"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
var debug = require('debug')('todos:server');
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("../plugins/mongoose"));
(async function () {
    await mongoose_1.default.getInstance();
    var PORT = normalizePort(process.env.PORT || '3000');
    var PORT_HTTPS = normalizePort(process.env.PORT_HTTPS || '3500');
    index_1.default.listen(PORT, () => console.log(`Running https: ${PORT_HTTPS}\nRunning port: ${PORT} ⚡\nRunning id: ${"runningID"} 👽`));
    const options = {
        cert: fs_1.default.readFileSync('src/certificates/cert.pem'),
        key: fs_1.default.readFileSync('src/certificates/key.pem'),
    };
    var server = http_1.default.createServer(index_1.default);
    server.listen(5030);
    server.on('error', onError);
    server.on('listening', onListening);
    https_1.default.createServer(options, index_1.default).listen(PORT_HTTPS, onListening);
    function normalizePort(val) {
        var port = parseInt(val, 10);
        if (isNaN(port)) {
            return val;
        }
        if (port >= 0) {
            return port;
        }
        return false;
    }
    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        var bind = typeof PORT === 'string'
            ? 'Pipe ' + PORT
            : 'Port ' + PORT;
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
    function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + (addr === null || addr === void 0 ? void 0 : addr.port);
        debug('Listening on ' + bind);
    }
})();
