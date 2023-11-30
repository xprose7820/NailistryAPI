"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// MongoDB Connection
mongoose_1.default.connect('mongodb://localhost:27017/NailistryDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const app = (0, express_1.default)();
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nailistry API',
            version: '1.0.0',
            description: 'A simple Express API for the Nailistry scheduling app',
        },
    },
    apis: ['./src/index.ts'], // Path to your API routes
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.get('/', (req, res) => {
    res.send('Hello from Nailistry API');
});
/**
* @swagger
* /example:
*   get:
*     summary: Example GET request
*     description: Returns a simple response
*     responses:
*       200:
*         description: A successful response
*/
app.get('/example', (req, res) => {
    res.send('This is a response from a GET request');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
