// const Sequelize = require('sequelize');
// const sequalize = require('../sequalize-connection');

// const tableData = sequalize.define(
//     "table",{
//         tableID: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//           },
//           service: {
//             type: Sequelize.STRING,
//             allowNull: true,
//           },
//           serverIp:{
//             type: Sequelize.STRING,
//             allowNull:true,
            
//           },
//           serverParth:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
//           discription:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
          
//           services_serviceName:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
          
//           services_serverIP:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
          
//           services_serverPath:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
          
//           services_relatedCommands:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
          
//           scripts_location:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
          
//           scripts_serverIP:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
          
//           scripts_uploadFile:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
//           scripts_discription:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
//           db_dbName:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
//           db_dbIPServerIP:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
//           db_backupLocation:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
//           db_discription:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
//           documentation_documentTitle:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
//           documentation_documentType:{
//             type:Sequelize.BOOLEAN,
//             allowNull:true
//           },
//           documentation_fileUpload:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
//           documentation_discription:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
//           troubleshootingTips_ServiceName:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
//           troubleshootingTips_issueDiscription:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
//           troubleshootingTips_resolvingProcedure:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
//           troubleshootingTips_fileUpload:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
//           cardID:{
//             type:Sequelize.STRING,
//             allowNull:true
//           }, 
//           tableFeeldValueID:{
//             type:Sequelize.STRING,
//             allowNull:true
//           },
//           delete_status:{
//             type:Sequelize.BOOLEAN,
//             allowNull:true
//           },
//     },
//     {
//       timestamps: false,
//       freezeTableName: true,
//       tableName: "table_data",
//     }
// );
// module.exports = tableData;