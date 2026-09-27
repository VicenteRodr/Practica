import { add, documentTextOutline, notifications } from 'ionicons/icons'

// datos de prueba hasta que tengamos el backend

export const usuario = {
  nombre: 'Juan López',
  notificaciones: 3,
}

export const opcionesInicio = [
  {
    titulo: 'Nueva solicitud',
    texto: 'Ingresa un reclamo, solicitud o sugerencia.',
    icono: add,
    color: 'icono-azul',
  },
  {
    titulo: 'Mis solicitudes',
    texto: 'Revisa el estado de tus trámites.',
    icono: documentTextOutline,
    color: 'icono-celeste',
  },
  {
    titulo: 'Notificaciones',
    texto: 'Mantente al día con novedades.',
    icono: notifications,
    color: 'icono-azul icono-blanco',
    badge: usuario.notificaciones,
  },
]

export const solicitudes = [
  { folio: '#SD-2026-0012', fecha: '05 sept 2026', tipo: 'Alumbrado', descripcion: 'Foco apagado en Av. del Mar', estado: 'En revisión' },
  { folio: '#SD-2026-0011', fecha: '01 sept 2026', tipo: 'Aseo y limpieza', descripcion: 'Retiro de escombros', estado: 'En proceso' },
  { folio: '#SD-2026-0010', fecha: '28 ago 2026', tipo: 'Áreas verdes', descripcion: 'Poda de árboles en plaza', estado: 'Resuelto' },
]

export const solicitudesFuncionario = [
  {
    folio: '#AAABBB123',
    fecha: '13/09/2026',
    ciudadano: 'Ana Paula',
    tipo: 'Alumbrado',
    detalle: 'Foco apagado ...',
    estado: 'En revisión',
  },
  {
    folio: '#AAABBB124',
    fecha: '13/09/2026',
    ciudadano: 'Juan Pérez',
    tipo: 'Alumbrado',
    detalle: 'Foco apagado ...',
    estado: 'En revisión',
  },
  {
    folio: '#AAABBB125',
    fecha: '13/09/2026',
    ciudadano: 'Daniel carvajal',
    tipo: 'Alumbrado',
    detalle: 'Foco apagado ...',
    estado: 'En revisión',
  },
]

