const sequelize = require('../sequelize');

const models = {};

models.Employees = require('./Employees')
models.Statements = require('./Statements')
models.Donations = require('./Donations')
models.Departments = require('./Departments')
models.Rates = require('./Rates')

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
    Employees: models.Employees,
    Statements: models.Statements,
    Donations: models.Donations,
    Departments: models.Departments,
    Rates: models.Rates
}

