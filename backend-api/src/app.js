const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { swaggerUi, specs } = require('./docs/swagger');

const { handleError, resourceNotFound } = require('./controllers/errorController');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const userRouter = require('./routes/user.router');
const productRouter = require('./routes/product.router');
const reviewRouter = require('./routes/review.router'); 

userRouter.setup(app);
productRouter.setup(app);
reviewRouter.setup(app);

app.use(resourceNotFound);
app.use(handleError);



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}.`)
});