const { Sequelize } = require("sequelize");
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI } = require("../keys");

let sequelize;

// Usar URI de conexión si está disponible
if (MYSQL_URI) {
    sequelize = new Sequelize(MYSQL_URI, {
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4', // Soporte para caracteres especiales
        },
        pool: {
            max: 20, // Número máximo de conexiones
            min: 5,  // Número mínimo de conexiones
            acquire: 30000, // Tiempo máximo en ms para obtener una conexión
            idle: 10000 // Tiempo máximo en ms que una conexión puede estar inactiva
        },
        logging: false // Desactiva el logging para mejorar el rendimiento
    });
} else {
    // Configuración para parámetros individuales
    sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
        host: MYSQLHOST,
        port: MYSQLPORT,
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4', // Soporte para caracteres especiales
        },
        pool: {
            max: 20, // Número máximo de conexiones
            min: 5,  // Número mínimo de conexiones
            acquire: 30000, // Tiempo máximo en ms para obtener una conexión
            idle: 10000 // Tiempo máximo en ms que una conexión puede estar inactiva
        },
        logging: false // Desactiva el logging para mejorar el rendimiento
    });
}

// Autenticar y sincronizar
sequelize.authenticate()
    .then(() => {
        console.log("Conexión establecida con la base de datos");
    })
    .catch((err) => {
        console.error("No se pudo conectar a la base de datos:", err.message);
    });

// Sincronización de la base de datos
const syncOptions = process.env.NODE_ENV === 'development' ? { force: true } : { alter: true };

sequelize.sync(syncOptions)
    .then(() => {
        console.log('Base de Datos sincronizadas');
    })
    .catch((error) => {
        console.error('Error al sincronizar la Base de Datos:', error);
    });

// Extracción de Modelos
const usuarioModel = require('../models/sql/usuario');
const rolModel = require('../models/sql/rol');
const detalleRolModel = require('../models/sql/detalleRol');
const clienteModel = require('../models/sql/cliente');
const mascotaModel = require('../models/sql/mascota');
const servicioModel = require('../models/sql/servicio');
const citaModel = require('../models/sql/cita');
const propietarioModel = require('../models/sql/propietario');
const productoModel = require('../models/sql/producto');
const pagoModel = require('../models/sql/pago');
const notificacionModel = require('../models/sql/notificacion');
const auditoriaModel = require('../models/sql/auditoria');
const feedbackModel = require('../models/sql/feedback');
const promocionModel = require('../models/sql/promocion');
const reservaModel = require('../models/sql/reserva');

// Nuevos modelos agregados
const configuracionModel = require('../models/sql/configuracion');
const configuracionServicioModel = require('../models/sql/configuracionServicio');
const historialCitaModel = require('../models/sql/historialCita');
const historialPagoModel = require('../models/sql/historialPago');
const logModel = require('../models/sql/log');
const pageModel = require('../models/sql/page');
const tipoMascotaModel = require('../models/sql/tipoMascota');
const tipoServicioModel = require('../models/sql/tipoServicio');

// Inicializar los modelos a sincronizar
const usuario = usuarioModel(sequelize, Sequelize);
const rol = rolModel(sequelize, Sequelize);
const detalleRol = detalleRolModel(sequelize, Sequelize);
const cliente = clienteModel(sequelize, Sequelize);
const mascota = mascotaModel(sequelize, Sequelize);
const servicio = servicioModel(sequelize, Sequelize);
const cita = citaModel(sequelize, Sequelize);
const propietario = propietarioModel(sequelize, Sequelize);
const producto = productoModel(sequelize, Sequelize);
const pago = pagoModel(sequelize, Sequelize);
const notificacion = notificacionModel(sequelize, Sequelize);
const auditoria = auditoriaModel(sequelize, Sequelize);
const feedback = feedbackModel(sequelize, Sequelize);
const promocion = promocionModel(sequelize, Sequelize);
const reserva = reservaModel(sequelize, Sequelize);

// Nuevos modelos inicializados
const configuracion = configuracionModel(sequelize, Sequelize);
const configuracionServicio = configuracionServicioModel(sequelize, Sequelize);
const historialCita = historialCitaModel(sequelize, Sequelize);
const historialPago = historialPagoModel(sequelize, Sequelize);
const log = logModel(sequelize, Sequelize);
const page = pageModel(sequelize, Sequelize);
const tipoMascota = tipoMascotaModel(sequelize, Sequelize);
const tipoServicio = tipoServicioModel(sequelize, Sequelize);

// Definir relaciones o claves foráneas

// Relaciones entre Usuario y DetalleRol
usuario.hasMany(detalleRol);
detalleRol.belongsTo(usuario);

// Relaciones entre Rol y DetalleRol
rol.hasMany(detalleRol);
detalleRol.belongsTo(rol);

// Relaciones entre Usuario y Citas
usuario.hasMany(cita);
cita.belongsTo(usuario);

// Relaciones entre Cliente y Mascotas
cliente.hasMany(mascota);
mascota.belongsTo(cliente);

// Relaciones entre Cliente y Citas
cliente.hasMany(cita);
cita.belongsTo(cliente);

// Relaciones entre Mascota y Citas
mascota.hasMany(cita);
cita.belongsTo(mascota);

// Relaciones entre Servicio y Citas
servicio.hasMany(cita);
cita.belongsTo(servicio);

// Relaciones entre Propietario y Mascotas
propietario.hasMany(mascota);
mascota.belongsTo(propietario);

// Relaciones entre Citas y Pagos
cita.hasMany(pago);
pago.belongsTo(cita);



// Exportar todos los modelos
module.exports = {
    usuario,
    rol,
    detalleRol,
    cliente,
    mascota,
    servicio,
    cita,
    propietario,
    producto,
    pago,
    notificacion,
    auditoria,
    feedback,
    promocion,
    reserva,
    configuracion,
    configuracionServicio,
    historialCita,
    historialPago,
    log,
    page,
    tipoMascota,
    tipoServicio
};
