// const Sequelize = require('sequelize');
// const sequalize = require('../sequalize-connection');

// const WorkingLocationsSeq = sequalize.define(
//     "DepartmentSeq",{
//         workingLocationID: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//           },
//           // workingLocationID: {
//           //   type: Sequelize.STRING,
//           //   allowNull: true,
//           // },
//           workingLocation: {
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
//       tableName: "emp_workingLocation",
//     }
// );
// module.exports = WorkingLocationsSeq;