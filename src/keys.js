const MYSQLHOST = 'localhost'; 
const MYSQLUSER = 'root';
const MYSQLPASSWORD = '';
const MYSQLDATABASE = 'petPoket';
const MYSQLPORT = '3306';
const MYSQL_URI = process.env.MYSQL_URI || '';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/petPoket';
// Exportar las variables de configuración
module.exports = {
    MYSQLHOST,
    MYSQLUSER,
    MYSQLPASSWORD,
    MYSQLDATABASE,
    MYSQLPORT,
    MYSQL_URI,
    MONGODB_URI
};