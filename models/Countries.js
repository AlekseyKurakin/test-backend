const {Model, DataTypes} = require("sequelize");

class Countries extends Model {
    static init(sequelize) {
        return super.init(
            {
                code: {
                    type: DataTypes.STRING,
                    field: 'code'
                },
                name: {
                    type: DataTypes.STRING,
                    field: 'name'
                },
            },
            {
                sequelize,
                tableName: 'countries',
                underscored: true
            }
        )
    }
}

module.exports = Countries;
