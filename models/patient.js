const Sequelize = require('sequelize');
const sql = new Sequelize('test', 'root', null, {
  dialect : 'mysql'
});
var patient  =sql.define('Patient',
	{
		name : Sequelize.STRING ,
		ID : 
			{ 
			type : Sequelize.NUMBER ,
			unique : true ,
			allowNull : false,
			primaryKey : true
			},
		Birthdate: Sequelize.DATE,
		history : 
			{
			type :Sequelize.STRING ,
			defaultValue : 'no record available'
			},
		Password : Sequelize.STRING(128),
		Insurance : Sequelize.BOOLEAN ,
		phone: Sequelize.NUMBER ,
		Address : Sequelize.STRING,
		Email : 
			{
			type : Sequelize.STRING ,
			isEmail : true ,
			isNull : false
			}

	}
);


sql.sync();









//module.exports = patient;