const {Model, DataTypes} = require("sequelize");

class Rates extends Model {
    static init(sequelize) {
        return super.init(
            {
                from: {
                    type: DataTypes.STRING,
                    field: 'from'
                },
                to: {
                    type: DataTypes.STRING,
                    field: 'to'
                },
                in: {
                    type: DataTypes.FLOAT,
                    field: 'in'
                },
                out: {
                    type: DataTypes.FLOAT,
                    field: 'out'
                },
                reserve: {
                    type: DataTypes.FLOAT,
                    field: 'reserve'
                },
                date: {
                    type: DataTypes.DATE,
                    field: 'date'
                },
                exchange_office_id: {
                    type: DataTypes.INTEGER,
                    field: 'exchange_office_id'
                }
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
