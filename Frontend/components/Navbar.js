
export default function Navbar() {
  return (
      <nav>
        <div className="titleContainer">
          <img alt="logo" className="logo" src="/media/logo.svg" />
          <p id="title">Infinity Chat</p>
        </div>
        <div>
          <span className="material-icons" id="more-menu">more_vert</span>
        </div>
      </nav>
  )
}