// const Sequelize = require('sequelize');
// const sequalize = require('../sequalize-connection');

// const Employee = sequalize.define(
//     "Employee",{
//         EmpID: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//           },
//           FName: {
//             type: Sequelize.STRING,
//             allowNull: true,
//           },
//           LName:{
//             type: Sequelize.STRING,
//             allowNull:false,
            
//           },
//           HomeCnt:{
//             type:Sequelize.INTEGER,
//             allowNull:false
//           },
//           PersonalCnt:{
//             type: Sequelize.INTEGER,
//             allowNull:false,
            
//           },
//           Address:{
//             type:Sequelize.STRING,
//             allowNull:false
//           }, 
//           WorkEmail:{
//             type:Sequelize.STRING,
//             allowNull:false
//           },
//           NIC:{
//             type: Sequelize.INTEGER,
//             allowNull:false,
            
//           },
//           JobPosition:{
//             type:Sequelize.STRING,
//             allowNull:false
//           },
//           EmploymentType:{
//             type: Sequelize.INTEGER,
//             allowNull:false,
            
//           },
//           EmpDate:{
//             type:Sequelize.STRING,
//             allowNull:false
//           },
//           FinalDate:{
//             type:Sequelize.STRING,
//             allowNull:false
//           },
//           Location:{
//             type:Sequelize.STRING,
//             allowNull:false
//           },
//           Manager:{
//             type:Sequelize.STRING,
//             allowNull:false
//           },
//           WorkCnt:{
//             type:Sequelize.STRING,
//             allowNull:false
//           },
//           delete_status: {
//             type: Sequelize.STRING,
//             allowNull: true,
//           } 
//     },
//     {
//       timestamps: false,
//       freezeTableName: true,
//       tableName: "Emp_Data",
//     }
// );
// module.exports = Employee;