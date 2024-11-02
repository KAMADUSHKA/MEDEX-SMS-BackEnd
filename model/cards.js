// const Sequelize = require('sequelize');
// const sequalize = require('../sequalize-connection');

// const Card = sequalize.define(
//     "Card",{
//         card_id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true,
//           },
//           image: {
//             type: Sequelize.STRING,
//             allowNull: true,
//           },
//           cardName:{
//             type: Sequelize.STRING,
//             allowNull:false,
            
//           },
//           cardDetails:{
//             type:Sequelize.STRING,
//             allowNull:false
//           }
          
//     },
//     {
//       timestamps: false,
//       freezeTableName: true,
//       tableName: "card_data",
//     }
// );
// module.exports = Card;