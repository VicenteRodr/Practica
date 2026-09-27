import { useState } from 'react'
import { IonIcon, useIonToast, useIonActionSheet } from '@ionic/react'
import { ellipsisHorizontal, chevronDown } from 'ionicons/icons'
import AppLayout from '../components/AppLayout'
import EstadoBadge from '../components/EstadoBadge'
import { solicitudesFuncionario as datosIniciales } from '../data/datosPrueba'
import './RevisarSolicitudes.css'

function RevisarSolicitudes() {
  const [solicitudes, setSolicitudes] = useState(datosIniciales)
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('')
  const [presentToast] = useIonToast()
  const [presentActionSheet] = useIonActionSheet()

  const cambiarEstado = (folio, nuevoEstado) => {
    setSolicitudes((prev) =>
      prev.map((s) => (s.folio === folio ? { ...s, estado: nuevoEstado } : s))
    )
    presentToast({
      message: `Solicitud ${folio} actualizada a "${nuevoEstado}"`,
      duration: 2000,
      color: 'success',
    })
  }

  const abrirOpciones = (solicitud) => {
    presentActionSheet({
      header: `Gestión de Solicitud ${solicitud.folio}`,
      subHeader: `Ciudadano: ${solicitud.ciudadano}`,
      buttons: [
        {
          text: 'Marcar como "En revisión"',
          handler: () => cambiarEstado(solicitud.folio, 'En revisión'),
        },
        {
          text: 'Marcar como "En proceso"',
          handler: () => cambiarEstado(solicitud.folio, 'En proceso'),
        },
        {
          text: 'Marcar como "Resuelto"',
          handler: () => cambiarEstado(solicitud.folio, 'Resuelto'),
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    })
  }

  // Filtrado por texto (folio o ciudadano) y por estado
  const solicitudesFiltradas = solicitudes.filter((s) => {
    const textoMatch =
      busqueda.trim() === '' ||
      s.folio.toLowerCase().includes(busqueda.toLowerCase()) ||
      s.ciudadano.toLowerCase().includes(busqueda.toLowerCase()) ||
      s.tipo.toLowerCase().includes(busqueda.toLowerCase())

    const estadoMatch =
      !filtroEstado ||
      filtroEstado === 'Todos' ||
      s.estado.toLowerCase() === filtroEstado.toLowerCase()

    return textoMatch && estadoMatch
  })

  return (
    <AppLayout
      tituloDesktop={
        <>
          Panel de Gestion<br />Municipal
        </>
      }
      subtitulo="Gestión y seguimiento de solicitudes ciudadanas"
      tituloMovil="Panel de Gestión"
      nombreUsuario="Administrador"
      notificaciones={3}
      notificacionesMovil={1}
      tipoMenu="funcionario"
    >
      <div className="revisar-solicitudes-page">
        {/* Título de la sección (Desktop) */}
        <h2 className="titulo-seccion-desktop">Revisar solicitudes</h2>

        {/* Barra de Filtros y Búsqueda (Desktop) */}
        <div className="filtros-desktop-fila">
          <div className="filtro-campo">
            <label className="filtro-label">Busqueda</label>
            <input
              type="text"
              className="filtro-input"
              placeholder="Buscar por #Folio o ciudadano..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="filtro-campo">
            <label className="filtro-label">Filtrar</label>
            <div className="filtro-select-contenedor">
              <select
                className="filtro-select"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="">Filtrar por Estado:</option>
                <option value="Todos">Todos</option>
                <option value="En revisión">En revisión</option>
                <option value="En proceso">En proceso</option>
                <option value="Resuelto">Resuelto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla para Desktop */}
        <div className="tabla-funcionario-caja">
          <table className="tabla-funcionario">
            <thead>
              <tr>
                <th className="th-folio"># Folio</th>
                <th className="th-fecha">Fecha</th>
                <th className="th-ciudadano">Ciudadano</th>
                <th className="th-tipo">Tipo</th>
                <th className="th-estado">Estado</th>
                <th className="th-acciones"></th>
              </tr>
            </thead>
            <tbody>
              {solicitudesFiltradas.length > 0 ? (
                solicitudesFiltradas.map((s) => (
                  <tr key={s.folio}>
                    <td className="td-folio">{s.folio}</td>
                    <td className="td-fecha">{s.fecha}</td>
                    <td className="td-ciudadano">{s.ciudadano}</td>
                    <td className="td-tipo">{s.detalle || s.tipo}</td>
                    <td className="td-estado">
                      <div
                        className="badge-interactivo"
                        title="Haz clic para cambiar estado"
                        onClick={() => abrirOpciones(s)}
                      >
                        <EstadoBadge estado={s.estado} />
                      </div>
                    </td>
                    <td className="td-acciones">
                      <button
                        className="btn-puntos-opciones"
                        aria-label="Más opciones"
                        onClick={() => abrirOpciones(s)}
                      >
                        <IonIcon icon={ellipsisHorizontal} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="td-sin-resultados">
                    No se encontraron solicitudes que coincidan con los filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Vista Móvil */}
        <div className="seccion-movil-funcionario">
          <h2 className="titulo-seccion-movil">Revisar solicitudes</h2>

          <div className="movil-busqueda-bloque">
            <label className="movil-label-solicitudes">Solicitudes:</label>
            <input
              type="text"
              className="filtro-input movil-busqueda-input"
              placeholder="Buscar por #Folio o ciudadano..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="movil-tarjetas-lista">
            {solicitudesFiltradas.length > 0 ? (
              solicitudesFiltradas.map((s) => (
                <div className="tarjeta-solicitud-funcionario" key={s.folio}>
                  <h3 className="tarjeta-folio-titulo">FOLIO {s.folio}</h3>
                  <p className="tarjeta-dato">
                    <strong>Ciudadano:</strong> {s.ciudadano}
                  </p>
                  <p className="tarjeta-dato">
                    <strong>Tipo:</strong> {s.tipo}
                  </p>

                  <div className="tarjeta-estado-selector">
                    <div className="estado-badge-dropdown">
                      <EstadoBadge estado={s.estado} />
                      <IonIcon icon={chevronDown} className="icono-dropdown-flecha" />
                      <select
                        className="estado-native-select"
                        value={s.estado}
                        onChange={(e) => cambiarEstado(s.folio, e.target.value)}
                        aria-label={`Cambiar estado de ${s.folio}`}
                      >
                        <option value="En revisión">En revisión</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Resuelto">Resuelto</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="movil-sin-resultados">
                No se encontraron solicitudes.
              </p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default RevisarSolicitudes
