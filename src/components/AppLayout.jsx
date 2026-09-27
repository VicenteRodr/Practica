import { useState } from 'react'
import { IonPage, IonContent, IonIcon, IonMenuButton, useIonRouter } from '@ionic/react'
import {
  personOutline,
  chevronDown,
  shieldCheckmarkOutline,
  swapHorizontalOutline,
  logOutOutline,
} from 'ionicons/icons'
import MenuLateral from './MenuLateral'
import Campana from './Campana'
import { usuario } from '../data/datosPrueba'
import './AppLayout.css'

// layout para las paginas despues de iniciar sesion (menu, header y footer)
// asi las otras pantallas solo ponen su contenido adentro
function AppLayout({
  children,
  tituloDesktop = <>Santo Domingo:<br />Responde</>,
  subtitulo = <>Gestión y seguimiento de<br />solicitudes ciudadanas</>,
  tituloMovil = <>Santo Domingo:<br />Responde</>,
  nombreUsuario = usuario.nombre,
  notificaciones = usuario.notificaciones,
  notificacionesMovil,
  tipoMenu = 'vecino',
}) {
  const [menuUsuarioAbierto, setMenuUsuarioAbierto] = useState(false)
  const router = useIonRouter()
  const badgeMovil = notificacionesMovil !== undefined ? notificacionesMovil : notificaciones
  const esAdmin = tipoMenu === 'funcionario' || nombreUsuario === 'Administrador'

  const cambiarARol = (destino) => {
    setMenuUsuarioAbierto(false)
    router.push(destino)
  }

  return (
    <IonPage>
      <IonContent>
        <div className="app-page">
          <div className="app-barra"></div>

          {/* header azul que solo sale en el celu */}
          <div className="header-movil">
            <IonMenuButton autoHide={false} />
            <p className="titulo-header-movil">{tituloMovil}</p>
            <div className="header-movil-acciones">
              <Campana cantidad={badgeMovil} />
              <div className="usuario-contenedor-movil">
                <button
                  className="btn-avatar-movil"
                  onClick={() => setMenuUsuarioAbierto(!menuUsuarioAbierto)}
                  aria-label="Menú de usuario"
                >
                  <div className="avatar-movil">
                    <IonIcon icon={personOutline} />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="app-ola ola-movil-app"></div>

          <div className="app-cuerpo">
            <aside className="sidebar">
              <MenuLateral tipo={tipoMenu} />
            </aside>

            <main className="app-main">
              <header className="app-header">
                <div className="app-titulos">
                  <h1>{tituloDesktop}</h1>
                  <p>{subtitulo}</p>
                </div>
                <div className="app-ola"></div>

                <div className="header-acciones">
                  <Campana cantidad={notificaciones} />
                  <div className="usuario-contenedor">
                    <div
                      className="usuario"
                      onClick={() => setMenuUsuarioAbierto(!menuUsuarioAbierto)}
                      title="Opciones de perfil"
                    >
                      <div className="avatar"><IonIcon icon={personOutline} /></div>
                      <span>{nombreUsuario}</span>
                      <IonIcon
                        icon={chevronDown}
                        className={`flechita ${menuUsuarioAbierto ? 'rotada' : ''}`}
                      />
                    </div>

                    {menuUsuarioAbierto && (
                      <>
                        <div
                          className="dropdown-overlay"
                          onClick={() => setMenuUsuarioAbierto(false)}
                        />
                        <div className="dropdown-usuario">
                          <div className="dropdown-usuario-header">
                            <span className="dropdown-badge-rol">
                              {esAdmin ? '🛡️ Perfil Funcionario' : '👤 Perfil Ciudadano'}
                            </span>
                            <p className="dropdown-nombre">{nombreUsuario}</p>
                            <p className="dropdown-correo">
                              {esAdmin ? 'admin@santodomingo.cl' : 'juan.lopez@gmail.com'}
                            </p>
                          </div>

                          <div className="dropdown-divisor"></div>

                          {!esAdmin ? (
                            <button
                              className="dropdown-opcion destacada"
                              onClick={() => cambiarARol('/revisar-solicitudes')}
                            >
                              <IonIcon icon={shieldCheckmarkOutline} />
                              <div className="dropdown-opcion-texto">
                                <strong>Cambiar a Administrador</strong>
                                <small>Ir al Panel de Gestión</small>
                              </div>
                            </button>
                          ) : (
                            <button
                              className="dropdown-opcion destacada"
                              onClick={() => cambiarARol('/inicio')}
                            >
                              <IonIcon icon={personOutline} />
                              <div className="dropdown-opcion-texto">
                                <strong>Cambiar a Juan López</strong>
                                <small>Ir a Portal Ciudadano</small>
                              </div>
                            </button>
                          )}

                          <div className="dropdown-divisor"></div>

                          <button
                            className="dropdown-opcion"
                            onClick={() =>
                              cambiarARol(esAdmin ? '/inicio' : '/revisar-solicitudes')
                            }
                          >
                            <IonIcon icon={swapHorizontalOutline} />
                            <span>
                              {esAdmin ? 'Ver Portal Ciudadano' : 'Ver Panel Funcionario'}
                            </span>
                          </button>

                          <button
                            className="dropdown-opcion salir"
                            onClick={() => cambiarARol('/login')}
                          >
                            <IonIcon icon={logOutOutline} />
                            <span>Cerrar sesión</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </header>

              {/* Dropdown flotante para móvil */}
              {menuUsuarioAbierto && (
                <div className="dropdown-movil-flotante">
                  <div
                    className="dropdown-overlay"
                    onClick={() => setMenuUsuarioAbierto(false)}
                  />
                  <div className="dropdown-usuario">
                    <div className="dropdown-usuario-header">
                      <span className="dropdown-badge-rol">
                        {esAdmin ? '🛡️ Perfil Funcionario' : '👤 Perfil Ciudadano'}
                      </span>
                      <p className="dropdown-nombre">{nombreUsuario}</p>
                      <p className="dropdown-correo">
                        {esAdmin ? 'admin@santodomingo.cl' : 'juan.lopez@gmail.com'}
                      </p>
                    </div>

                    <div className="dropdown-divisor"></div>

                    {!esAdmin ? (
                      <button
                        className="dropdown-opcion destacada"
                        onClick={() => cambiarARol('/revisar-solicitudes')}
                      >
                        <IonIcon icon={shieldCheckmarkOutline} />
                        <div className="dropdown-opcion-texto">
                          <strong>Cambiar a Administrador</strong>
                          <small>Ir al Panel de Gestión</small>
                        </div>
                      </button>
                    ) : (
                      <button
                        className="dropdown-opcion destacada"
                        onClick={() => cambiarARol('/inicio')}
                      >
                        <IonIcon icon={personOutline} />
                        <div className="dropdown-opcion-texto">
                          <strong>Cambiar a Juan López</strong>
                          <small>Ir a Portal Ciudadano</small>
                        </div>
                      </button>
                    )}

                    <div className="dropdown-divisor"></div>

                    <button
                      className="dropdown-opcion salir"
                      onClick={() => cambiarARol('/login')}
                    >
                      <IonIcon icon={logOutOutline} />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                </div>
              )}

              {children}
            </main>
          </div>

          <footer className="app-footer">
            © 2026 Municipalidad de Santo Domingo.<br />
            Todos los derechos reservados
          </footer>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default AppLayout
