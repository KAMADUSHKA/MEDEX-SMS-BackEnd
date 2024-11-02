// const Sequelize = require("sequelize");
// const sequalize = require("../sequalize-connection");

// const DepartureEmployeeSeq = sequalize.define(
//   "DepartureEmployeeSeq",
//   {
//     DepartureReasonID: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     // EmpID: {
//     //   type: Sequelize.STRING,
//     //   allowNull: true,
//     // },
//     DepartureReason: {
//       type: Sequelize.STRING,
//       allowNull: true,
//     },
//     delete_status: {
//       type: Sequelize.STRING,
//       allowNull: true,
//     },
//   },
//   {
//     timestamps: false,
//     freezeTableName: true,
//     tableName: "emp_departureReason",
//   }
// );
// module.exports = DepartureEmployeeSeq;
