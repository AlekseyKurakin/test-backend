const { Model, DataTypes } = require("sequelize");

class Departments extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING,
                    field: 'name'
                },
            },
            {
                sequelize,
                tableName: 'departments',
                underscored: true
            }
        )
    }
}

module.exports = Departments;
