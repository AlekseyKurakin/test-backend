const {Model, DataTypes} = require("sequelize");

class Rates extends Model {
    static init(sequelize) {
        return super.init(
            {
                date: {
                    type: DataTypes.DATE,
                    field: 'date'
                },
                sign: {
                    type: DataTypes.STRING,
                    field: 'sign'
                },
                value: {
                    type: DataTypes.FLOAT,
                    field: 'value'
                },
            },
            {
                sequelize,
                tableName: 'rates',
                underscored: true
            }
        )
    }
}

module.exports = Rates;
