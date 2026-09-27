import { IonIcon, useIonRouter } from '@ionic/react'
import { useLocation } from 'react-router-dom'
import {
  homeOutline,
  documentTextOutline,
  addCircleOutline,
  notificationsOutline,
  personOutline,
  helpCircleOutline,
  logOutOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons'
import { usuario } from '../data/datosPrueba'
import './MenuLateral.css'

const opcionesVecino = [
  { nombre: 'Inicio', icono: homeOutline, ruta: '/inicio' },
  { nombre: 'Mis solicitudes', icono: documentTextOutline, ruta: '/revisar-solicitudes' },
  { nombre: 'Nueva solicitud', icono: addCircleOutline },
  { nombre: 'Ingresar reclamo', iconoCustom: '/img/alerta-usuario.svg', ruta: '/ingreso-reclamo' }, 
  { nombre: 'Notificaciones', icono: notificationsOutline, badge: usuario.notificaciones },
  { nombre: 'Mi perfil', icono: personOutline },
  { nombre: 'Ayuda', icono: helpCircleOutline },
]

const opcionesFuncionario = [
  { nombre: 'Inicio', icono: homeOutline, ruta: '/inicio' },
  { nombre: 'Revisar solicitudes', icono: documentTextOutline, ruta: '/revisar-solicitudes' },
  { nombre: 'Revisar reclamo', iconoCustom: '/img/alerta-usuario.svg', ruta: '/ingreso-reclamo' },
  { nombre: 'Notificaciones', icono: notificationsOutline, badge: 3 },
  { nombre: 'Mi Perfil', icono: personOutline },
  { nombre: 'Cerrar Sesión', icono: logOutOutline, ruta: '/login' },
]

function MenuLateral({ tipo }) {
  const router = useIonRouter()
  const location = useLocation()

  const esFuncionario =
    tipo === 'funcionario' ||
    location.pathname === '/revisar-solicitudes' ||
    location.pathname === '/panel-gestion'

  const listaOpciones = esFuncionario ? opcionesFuncionario : opcionesVecino

  const irA = (opcion) => {
    // cierra el menu del celu (en desktop no hace nada)
    const menu = document.querySelector('ion-menu')
    if (menu) menu.close()
    if (opcion.ruta) {
      router.push(opcion.ruta)
    }
  }

  return (
    <nav className="menu-lateral">
      <img className="menu-logo" src="/img/logo.png" alt="Municipalidad de Santo Domingo" />

      {listaOpciones.map((opcion) => (
        <button
          key={opcion.nombre}
          className={location.pathname === opcion.ruta ? 'menu-item activo' : 'menu-item'}
          onClick={() => irA(opcion)}
        >
          {opcion.iconoCustom ? (
            <IonIcon src={opcion.iconoCustom} />
          ) : (
            <IonIcon icon={opcion.icono} />
          )}
          <span>{opcion.nombre}</span>
          {opcion.badge > 0 && <span className="badge">{opcion.badge}</span>}
        </button>
      ))}

      <div className="menu-cambio-perfil">
        <button
          className="btn-cambio-perfil"
          onClick={() => {
            const menu = document.querySelector('ion-menu')
            if (menu) menu.close()
            router.push(esFuncionario ? '/inicio' : '/revisar-solicitudes')
          }}
        >
          <IonIcon icon={esFuncionario ? personOutline : shieldCheckmarkOutline} />
          <span>{esFuncionario ? 'Cambiar a Ciudadano' : 'Cambiar a Administrador'}</span>
        </button>
      </div>
    </nav>
  )
}

export default MenuLateral