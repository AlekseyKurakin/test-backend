const sequelize = require('./sequelize');
const AppService = require('./services/app.service');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/top-exchangers', async (req, res) => {
    const response = await AppService.getRewards();
    res.json(response);
});

sequelize.sync({ force: true }) // set to false if you dont want to recreate DB everytime
    .then(() => {
        app.listen(port, async () => {
            console.log(`Server is running on port ${port}`);
            await AppService.parseAndInsert();
        });
    })
    .catch((error) => {
        console.error(`Error`, error);
    });


