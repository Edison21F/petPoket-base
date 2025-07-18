const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const { 
    mostrarNotificaciones,
    crearNotificacion,
    obtenerNotificacionesPorUsuario,
    marcarComoLeida,
    marcarTodasComoLeidas,
    eliminarNotificacion,
    crearNotificacionMasiva,
    obtenerEstadisticas
} = require('../controller/notificacion.controller');

// Validaciones para crear notificación
const validacionCrearNotificacion = [
    body('idUsuario')
        .isInt({ min: 1 })
        .withMessage('El ID del usuario debe ser un número entero positivo'),
    
    body('mensaje')
        .notEmpty()
        .withMessage('El mensaje es obligatorio')
        .isLength({ min: 1, max: 500 })
        .withMessage('El mensaje debe tener entre 1 y 500 caracteres'),
    
    body('tipo')
        .optional()
        .isIn(['general', 'recordatorio', 'urgente', 'promocion', 'sistema'])
        .withMessage('Tipo debe ser: general, recordatorio, urgente, promocion o sistema')
];

// Validaciones para notificación masiva
const validacionNotificacionMasiva = [
    body('mensaje')
        .notEmpty()
        .withMessage('El mensaje es obligatorio')
        .isLength({ min: 1, max: 500 })
        .withMessage('El mensaje debe tener entre 1 y 500 caracteres'),
    
    body('usuarios')
        .isArray({ min: 1 })
        .withMessage('Usuarios debe ser un array con al menos un elemento'),
    
    body('usuarios.*')
        .isInt({ min: 1 })
        .withMessage('Cada usuario debe ser un número entero positivo'),
    
    body('tipo')
        .optional()
        .isIn(['general', 'recordatorio', 'urgente', 'promocion', 'sistema'])
        .withMessage('Tipo debe ser: general, recordatorio, urgente, promocion o sistema')
];

// Validaciones para parámetros
const validacionParametroId = [
    param('idNotificacion')
        .isInt({ min: 1 })
        .withMessage('El ID de la notificación debe ser un número entero positivo')
];

const validacionParametroUsuario = [
    param('idUsuario')
        .isInt({ min: 1 })
        .withMessage('El ID del usuario debe ser un número entero positivo')
];

// ================ RUTAS DE NOTIFICACIONES ================

// Obtener todas las notificaciones
router.get('/lista', mostrarNotificaciones);

// Obtener estadísticas de notificaciones
router.get('/estadisticas', obtenerEstadisticas);

// Obtener notificaciones por usuario
router.get('/usuario/:idUsuario', validacionParametroUsuario, obtenerNotificacionesPorUsuario);

// Obtener notificaciones no leídas por usuario
router.get('/usuario/:idUsuario/no-leidas', validacionParametroUsuario, (req, res) => {
    req.query.estado = 'pendiente';
    obtenerNotificacionesPorUsuario(req, res);
});

// Crear nueva notificación
router.post('/crear', validacionCrearNotificacion, crearNotificacion);

// Crear notificaciones masivas
router.post('/crear-masiva', validacionNotificacionMasiva, crearNotificacionMasiva);

// Marcar notificación como leída
router.put('/marcar-leida/:idNotificacion', validacionParametroId, marcarComoLeida);

// Marcar todas las notificaciones de un usuario como leídas
router.put('/marcar-todas-leidas/:idUsuario', validacionParametroUsuario, marcarTodasComoLeidas);

// Eliminar notificación
router.delete('/eliminar/:idNotificacion', validacionParametroId, eliminarNotificacion);

module.exports = router;