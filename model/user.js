// const Sequelize = require("sequelize");
// const sequelize = require("../sequalize-connection");

// const Admin = sequelize.define(
//   "Admin",
//   {
//     // attributes
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       validate: {
//         isEmail: {
//           msg: "Invalid Email",
//         },
//         notNull: {
//           msg: "Email can't be null",
//         },
//         len: {
//           args: [1, 101],
//           msg: "Invalid charcter length for Email",
//         },
//       },
//     },
//     password: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       validate: {
//         notNull: {
//           msg: "Password can't be null",
//         },
//         len: {
//           args: [1, 254],
//           msg: "Invalid character length for Password",
//         }
//       }
//     },
//     login_count:{
//       type: Sequelize.INTEGER,
//       allowNull:true,
      
//     },
//     account_lock:{
//       type:Sequelize.BOOLEAN,
//       allowNull:true
//     },
//     locked_at:{
//       type: Sequelize.DATE,
//       allowNull:true
//     }
//   },

//   {
//     timestamps: false,
//     freezeTableName: true,
//     tableName: "admin_account",
//   }
// );
// module.exports = Admin;