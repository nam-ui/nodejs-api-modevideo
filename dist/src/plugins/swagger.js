"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerJsOptions = void 0;
exports.swaggerJsOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST API Docs",
            version: "3.0.0",
            description: "Link doc hỗ trợ: [https://swagger.io](https://swagger.io). \n- Để sự dụng chức năng cập nhật customer = Excel thì đây là thông tin hổ trợ Link: [https://bespoke-youtiao-c184a9.netlify.app/](https://bespoke-youtiao-c184a9.netlify.app/)  \n- /postman",
        },
        components: {
            securitySchemes: {
                APIKey: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header',
                }
            }
        },
        security: [{
                APIKey: []
            }]
    },
    apis: ["./src/*.ts", "./src/app/*.ts"],
};
exports.default = exports.swaggerJsOptions;
