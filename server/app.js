require('dotenv').config({ path: './config/.env' });
const connectDB = require('./config/db');
const connectExpress = require('./config/express');
const express = require('express');

const startServer = async () => {
    const app = express();
    await connectDB();
    await connectExpress({ app });

    let port = process.env.PORT || 3000;
    app.listen(port, err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Server running on port ${port}`);
    });
}

startServer();