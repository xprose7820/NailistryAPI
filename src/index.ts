import mongoose from 'mongoose';

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/NailistryDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const app = express();
const swaggerOptions: swaggerJsDoc.Options = {
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

const swaggerDocs: any = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
