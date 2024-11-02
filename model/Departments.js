// const Sequelize = require('sequelize');
// const sequalize = require('../sequalize-connection');

// const DepartmentSeq = sequalize.define(
//     "DepartmentSeq",{
//       departmentID : {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//           },
//           // departmentID: {
//           //   type: Sequelize.STRING,
//           //   allowNull: true,
//           // },
//           department: {
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
//       tableName: "emp_department",
//     }
// );
// module.exports = DepartmentSeq;