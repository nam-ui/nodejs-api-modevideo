import swaggerJsdoc from "swagger-jsdoc";
export const swaggerJsOptions: swaggerJsdoc.Options = {
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
}
export default swaggerJsOptions;