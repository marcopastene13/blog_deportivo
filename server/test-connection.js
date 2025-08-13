const sequelize = require('./src/config/database');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a Supabase PostgreSQL');
    process.exit(0);
  } catch (error) {
    console.error('Error al conectar:', error);
    process.exit(1);
  }
})();
