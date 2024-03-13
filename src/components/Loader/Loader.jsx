import './Loader.css'

function Loader({ children, loaderSize }) {
  return (
    <div className="loader_area df_ce">
      <div className="df_ai_ce list_v">
        <div
          className="loader_spinner"
          style={{ '--loader-size': loaderSize }}
        ></div>
        <div className="loader_text">{children}</div>
      </div>
    </div>
  )
}

export default Loader
