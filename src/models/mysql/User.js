import { Sequelize, Model, DataTypes } from 'sequelize';
const sequelize = new Sequelize('mysql');

class User extends Model {}
User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  token: DataTypes.STRING,
}, { sequelize, modelName: 'User' });

(async () => {
  await sequelize.sync();
  const admin = await User.create({
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'password',
  });
  console.log(admin.toJSON());
})();