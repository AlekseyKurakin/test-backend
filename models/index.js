const sequelize = require('../sequelize');

const models = {};

models.ExchangeOffices = require('./ExchangeOffices')
models.Rates = require('./Rates')
models.Exchanges = require('./Exchanges')
models.Countries = require('./Countries')

const modelNames = Object.keys(models);

modelNames.forEach(modelName => {
    models[modelName] = models[modelName].init(sequelize);
});

modelNames.forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

for (const modelName of modelNames) {
    module.exports[modelName] = models[modelName];
}

module.exports = {
    ExchangeOffices: models.ExchangeOffices,
    Rates: models.Rates,
    Exchanges: models.Exchanges,
    Countries: models.Countries
}

