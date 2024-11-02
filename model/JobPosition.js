// const Sequelize = require('sequelize');
// const sequalize = require('../sequalize-connection');

// const JobPositionSeq = sequalize.define(
//     "DepartmentSeq",{
//         JobPositionID: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//           },
//           // JobPositionID: {
//           //   type: Sequelize.STRING,
//           //   allowNull: true,
//           // },
//           JobTitle: {
//             type: Sequelize.STRING,
//             allowNull: true,
//           },
//           DepartmentName: {
//             type: Sequelize.STRING,
//             allowNull: true,
//           },
//           NumberOfEmployees: {
//             type: Sequelize.INTEGER,
//             allowNull: true,
//           },
//           Reporting: {
//             type: Sequelize.STRING,
//             allowNull: true,
//           },
//           delete_status: {
//             type: Sequelize.STRING,
//             allowNull: true,
//           }
          
//     },
//     {
//       timestamps: false,
//       freezeTableName: true,
//       tableName: "emp_JobPosition",
//     }
// );
// module.exports = JobPositionSeq;