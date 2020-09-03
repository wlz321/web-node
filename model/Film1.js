
const Sequelize = require('sequelize');

module.exports = {
    name : "res_Film1" ,
    attributes:{
        FilmID:{
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        ItemName: {
            type: Sequelize.STRING(512),
            allowNull: false
        },
        ItemIndex:{
            type: Sequelize.STRING(64),
            allowNull: false
        },
        ItemValue: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    }
}