# setup
git --version 2.38.1.windows.1
npm--version 8.19.2
node --version v16.18.0
yarn --version 1.22.19
/n
-> setup {
    step 1 ( install node_mondule ): yarn
    step 2 ( run app ): yarn start || yarn run dev
    if you want to build server yarn run build
}
-> deloy vps cmd: pm2 start dist/src/bin/www.js -f --watch -i --max-old-space-size=2048
# environment  .env
PORT=8080
PORT_HTTPS=8443
NODE_ENV=test
<!-- # ENV JWT -->
NODE_ENV_EXPIRES_IN_JWT=600
NODE_ENV_ACCESS_TOKEN_SECRET="your key"
NODE_ENV_REFRESH_TOKEN_SECRET="your key"
NODE_ENV_SALT_OR_SOUNDS="101"
<!-- # HANDLER IMAGE WITH CLOUDINARY -->
NODE_ENV_CLOUDINARY_NAME=your-key
NODE_ENV_CLOUDINARY_API_KEY=your-key
NODE_ENV_CLOUDINARY_API_SECRET=your-key
<!-- # DATABASE MONGODB NO SQL -->
NODE_ENV_MONGO=your-key
<!-- # LOGIN THREE Facebook -->
NODE_ENV_FB_APP_ID=your-key
NODE_ENV_FB_APP_SECRET=your-key
NODE_ENV_FB_APP_REDIRECT_URL=your-key-https
<!-- # LOGIN THREE Google -->
NODE_ENV_GOOGLE_APP_ID=your-key
NODE_ENV_GOOGLE_APP_SECRET=your-key
NODE_ENV_GOOGLE_APP_REDIRECT_URL=your-key-https
    ## GOOGLE KEY - DRIVER - MAP 
    NODE_ENV_GOOGLE_API_KEY=your-key
<!-- # Elastic search -->
NODE_ENV_ELASTIC_SEARCH_KEY=your-key
NODE_ENV_ELASTIC_SEARCH_CLOUD_ID=your-key




# save lib 
{
  "scripts": {
    "pm2": "pm2 start dist/src/bin/www.js -f --watch -i --max-old-space-size=2048",
    "dev": "nodemon src/bin/www.ts NODE_ENV=test",
    "start": "ts-node src/bin/www.ts",
    "start:dev": "ts-node src/bin/www.ts --watch",
    "start:debug": "ts-node src/bin/www.ts --debug --watch",
    "start:prod": "ts-node dist/index",
    "format": "prettier --write \"src/**/*.ts\"",
    "build": "tsc && node dist/src/bin/www.js",
    "test": "NODE_ENV=test jest",
    "test:watch": "NODE_ENV=test jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.0",
    "@types/body-parser": "^1.19.2",
    "@types/connect-busboy": "^1.0.0",
    "@types/connect-sqlite3": "^0.9.1",
    "@types/cors": "^2.8.12",
    "@types/express": "^4.17.14",
    "@types/express-fileupload": "^1.4.1",
    "@types/express-session": "^1.17.5",
    "@types/morgan": "^1.9.3",
    "@types/swagger-jsdoc": "^6.0.1",
    "@types/swagger-ui-express": "^4.1.3",
    "@types/uuid": "^9.0.0",
    "nodemon": "^2.0.20",
    "prettier": "^2.8.0",
    "ts-node": "^10.9.1",
    "typescript": "^4.9.3"
  },
  "dependencies": {
    "@elastic/elasticsearch": "^8.5.0",
    "@types/jsonwebtoken": "^8.5.9",
    "@types/lodash": "^4.14.191",
    "axios": "^1.2.1",
    "bcrypt": "^5.1.0",
    "cloudinary": "^1.32.0",
    "config": "^3.3.8",
    "connect-busboy": "^1.0.0",
    "connect-sqlite3": "^0.9.13",
    "cors": "^2.8.5",
    "debug": "^4.3.4",
    "dotenv": "^16.0.3",
    "ejs": "^3.1.8",
    "express": "^4.18.2",
    "express-fileupload": "^1.4.0",
    "express-session": "^1.17.3",
    "googleapis": "^109.0.1",
    "helmet": "^6.0.1",
    "jest": "^29.3.1",
    "jsonwebtoken": "^8.5.1",
    "lodash": "^4.17.21",
    "lowdb": "^5.0.5",
    "mongoose": "^6.7.5",
    "morgan": "^1.10.0",
    "ngrok": "^4.3.3",
    "query-string": "^7.1.3",
    "rand-token": "^1.0.1",
    "rxjs": "^7.6.0",
    "swagger-jsdoc": "^6.2.5",
    "swagger-ui-express": "^4.6.0",
    "uuid": "^9.0.0"
  }
}
