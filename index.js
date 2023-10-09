const fs = require('fs');
const sequelize = require('./sequelize');
const { ExchangeOffices, Exchanges, Rates, Countries } = require('./models')
const AppService = require('./services/app.service');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/top-exchangers', upload.single('file'), async (req, res) => {
    const file = req.file;
    const data =  AppService.parseFile(file);
    await AppService.insertData(data);
    const response = await AppService.getTopExchangers();
    res.json(response);
});

sequelize.sync({ force: true }) // set to false if you dont want to recreate DB everytime
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error(`Error`, error);
    });


