const {Model, DataTypes} = require("sequelize");

class ExchangeOffices extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING,
                    field: 'name'
                },
                country: {
                    type: DataTypes.STRING,
                    field: 'country'
                },
            },
            {
                sequelize,
                tableName: 'exchange_offices',
                underscored: true
            }
        )
    };

    static associate(models) {
        ExchangeOffices.hasOne(models.Countries, {
            as: 'countries',
            foreignKey: 'country'
        })

        ExchangeOffices.hasMany(models.Rates, {
            as: 'rates',
            foreignKey: 'exchange_office_id'
        })

        ExchangeOffices.hasMany(models.Exchanges, {
            as: 'exchanges',
            foreignKey: 'exchange_office_id'
        })
    }
}

module.exports = ExchangeOffices;
