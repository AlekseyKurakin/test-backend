const {Model, DataTypes} = require("sequelize");

class Exchanges extends Model {
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
                ask: {
                    type: DataTypes.FLOAT,
                    field: 'ask'
                },
                date: {
                    type: DataTypes.DATE,
                    field: 'date'
                },
                exchange_office_id: {
                    type: DataTypes.INTEGER,
                    field: 'exchange_office_id'
                },
            },
            {
                sequelize,
                tableName: 'exchanges',
                underscored: true
            }
        )
    }
}

module.exports = Exchanges;
