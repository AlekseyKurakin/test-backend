const fs = require('fs');
const { Employees, Statements, Departments, Rates, Donations} = require("../models");
const sequelize = require('./../sequelize');
const { QueryTypes } = require("sequelize");

class AppService {

    static async getRewards() {
        const rewards = await sequelize.query(`
            SELECT
                employee_id as id,
                CONCAT(e.name,' ', e.surname) AS name,
                (
                    SUM(amount) *
                        (
                            SELECT 10000 / SUM(amount)
                            FROM donations d
                        )
                ) AS reward 
            FROM donations d
            LEFT JOIN employees e on e.id = d.employee_id
            GROUP BY employee_id, e.name, e.surname 
            HAVING SUM(amount) > 100;
        `, {
            type: QueryTypes.SELECT
        });

        return rewards;
    }

    static async parseAndInsert() {
        const data =  AppService.parseFile();
        await AppService.insertDataInDB(data);
    }

    static parseFile(file) {
        // const lines = file.buffer.toString('utf-8').split('\n'); if file comes from api
        const lines = fs.readFileSync('dump.txt', 'utf-8').split('\n');
        let pointer;
        let employeeId = 0;
        const dataBaseStructure = {
            'employee' : [],
            'department' : [],
            'statement' : [],
            'donation': [],
            'rate': []
        }

        /*
            I could have written a recursive function to create json object from this txt file and then parse it,
            but I think I have found more elegant solution
        */
        for (const line of lines) {
            const trimmedLine = line.trim();

            if (Object.keys(dataBaseStructure).includes(trimmedLine.toLowerCase())) {
                if (pointer && ['statement', 'donation'].includes(pointer)) {
                    dataBaseStructure[pointer].slice(-1)[0]['employee_id'] = employeeId;
                }

                pointer = trimmedLine.toLowerCase();
                dataBaseStructure[pointer].push({});
            }

            if (pointer && trimmedLine.includes(':')) {
                const [key, value] = trimmedLine.split(':').map((item) => item.trim());

                if (pointer === 'department' && key === 'id') {
                    dataBaseStructure['employee'].slice(-1)[0]['department_id'] = value;

                    if (dataBaseStructure[pointer].findIndex(department => department.id === value) !== -1) {
                        dataBaseStructure[pointer].pop();
                        pointer = '';
                        continue;
                    }
                } else if (pointer === 'employee' && key === 'id') {
                    employeeId = value;
                }

                dataBaseStructure[pointer].slice(-1)[0][key] = value;
            }
        }

        return dataBaseStructure;
    }

    static async insertDataInDB(data) {
        await this.insertEmployees(data['employee']);
        await this.insertStatements(data['statement']);
        await this.insertDepartments(data['department']);
        await this.insertRates(data['rate']);
        await this.insertDonations(data['donation'], data['rate']);
    }

    static async insertEmployees(employees) {
        await Employees.bulkCreate(employees);
    }

    static async insertStatements(statements) {
        await Statements.bulkCreate(statements);
    }

    static async insertDepartments(departments) {
        await Departments.bulkCreate(departments);
    }

    static async insertRates(rates) {
        await Rates.bulkCreate(rates);
    }

    static async insertDonations(donations, rates) {
        donations.forEach(donation => {
            const [amount, sign] = donation.amount.split(' ');
            if (sign === 'USD') {
                donation.amount = amount;
            } else {
                const rate = rates.find(rate => rate.date === donation.date && rate.sign === sign);
                donation.amount = rate.value * amount;
            }
        });

        await Donations.bulkCreate(donations);
    }
}

module.exports = AppService;
