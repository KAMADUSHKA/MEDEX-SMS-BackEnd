// const Sequelize = require("sequelize");
// const sequalize = require("../sequalize-connection");

// const SalarySeq = sequalize.define(
//   "SalarySeq",
//   {
//     EmpID: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     // EmpID: {
//     //   type: Sequelize.STRING,
//     //   allowNull: true,
//     // },
//     EmpName: {
//       type: Sequelize.STRING,
//       allowNull: true,
//     },
//     BasicSalary: {
//       type: Sequelize.INTEGER,
//       allowNull: true,
//     },
//     TotalAllowance: {
//       type: Sequelize.INTEGER,
//       allowNull: true,
//     },
//     TotalSalary: {
//       type: Sequelize.INTEGER,
//       allowNull: true,
//     },
//     delete_status: {
//       type: Sequelize.STRING,
//       allowNull: true,
//     }
//   },
//   {
//     timestamps: false,
//     freezeTableName: true,
//     tableName: "emp_salary",
//   }
// );
// module.exports = SalarySeq;
