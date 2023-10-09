const {Model, DataTypes} = require("sequelize");

class Statements extends Model {
    static init(sequelize) {
        return super.init(
            {
                amount: {
                    type: DataTypes.FLOAT,
                    field: 'amount'
                },
                date: {
                    type: DataTypes.DATE,
                    field: 'date'
                },
                employee_id: {
                    type: DataTypes.INTEGER,
                    field: 'employee_id'
                },
            },
            {
                sequelize,
                tableName: 'statements',
                underscored: true
            }
        )
    };
}

module.exports = Statements;
