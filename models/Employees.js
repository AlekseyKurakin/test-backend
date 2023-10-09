const { Model, DataTypes } = require("sequelize");

class Employees extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING,
                    field: 'name'
                },
                surname: {
                    type: DataTypes.STRING,
                    field: 'surname'
                },
                department_id: {
                    type: DataTypes.INTEGER,
                    field: 'department_id'
                },
            },
            {
                sequelize,
                tableName: 'employees',
                underscored: true,
            }
        )
    }

    static associate(models) {
        Employees.hasOne(models.Departments, {
            as: 'department',
        })

        Employees.hasMany(models.Statements, {
            as: 'statements',
            foreignKey: 'employee_id'
        })

        Employees.hasMany(models.Donations, {
            as: 'exchanges',
            foreignKey: 'employee_id'
        })
    }
}

module.exports = Employees;
