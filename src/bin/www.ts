import app from "../index";
var debug = require('debug')('todos:server');
import http from "http";
import https from "https"
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import Mongoose from "../plugins/mongoose";
import ngrok from "ngrok";
(async function () {
    await Mongoose.getInstance();
    
    var PORT = normalizePort(process.env.PORT || '3000');
    var PORT_HTTPS = normalizePort(process.env.PORT_HTTPS || '3500');
    await ngrok.authtoken("2IS9drElwldbiKKPDSyrA83H41i_uRK6LhiQbJPUiM2CYpbc")
    const url = await ngrok.connect(8080);
    app.listen(PORT, () => console.log(`Running https: ${PORT_HTTPS}\nRunning port: ${PORT} ⚡\nRunning id: ${"runningID"} ngrok: ${url} 👽`));
    const options = {
        cert: fs.readFileSync('src/certificates/cert.pem'),
        key: fs.readFileSync('src/certificates/key.pem'),
    };
    
    var server = http.createServer(app);
    server.listen(5030);
    server.on('error', onError);
    server.on('listening', onListening);
    https.createServer(options, app).listen(PORT_HTTPS, onListening);
    function normalizePort(val: string) {
        var port = parseInt(val, 10);
        if (isNaN(port)) {
            return val;
        }
        if (port >= 0) {
            return port;
        }
        return false;
    }
    function onError(error: any) {
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
            : 'port ' + addr?.port;
        debug('Listening on ' + bind);
    }
})()
