const fs = require('fs');
const {ExchangeOffices, Exchanges, Rates, Countries} = require("../models");
const sequelize = require('./../sequelize');
const {QueryTypes} = require("sequelize");

class AppService {

    static parseFile(file) {
        const fileContent = file.buffer.toString('utf-8');
        const lines = fileContent.split('\n');
        let pointer;
        let exchangeOfficeId = 0;
        const dataBaseStructure = {
            'exchange-office' : [],
            'exchange' : [],
            'rate' : [],
            'country': []
        }

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (['exchange-office', 'exchange', 'rate', 'country'].includes(trimmedLine)) {
                if (pointer && (pointer === 'exchange' || pointer === 'rate')) {
                    dataBaseStructure[pointer][dataBaseStructure[pointer].length - 1]['ExchangeOfficeId'] = exchangeOfficeId;
                }

                pointer = trimmedLine;
                dataBaseStructure[pointer].push({});
            }
            if (trimmedLine.includes('=')) {
                const [key, value] = trimmedLine.split('=').map((item) => item.trim());
                dataBaseStructure[pointer][dataBaseStructure[pointer].length - 1][key] = value;

                if (pointer === 'exchange-office' && key === 'id') {
                    exchangeOfficeId = value;
                }
            }
        }

        return dataBaseStructure;
    }

    static async insertData(data) {
        await ExchangeOffices.bulkCreate(data['exchange-office']).then(r => (r))
        await Exchanges.bulkCreate(data['exchange']).then(r => (r))
        await Rates.bulkCreate(data['rate']).then(r => (r))
        await Countries.bulkCreate(data['country']).then(r => (r))
    }

    static async getTopExchangers() {
        // there must be a big query with calculations and nested requests like SELECT (SELECT) but unfortunately i didn't understood how we get bid

        const exchangers = await sequelize.query(`
            SELECT * FROM exchange_offices
        `, {
            type: QueryTypes.SELECT
        })
        return exchangers;
    }
}

module.exports = AppService;
