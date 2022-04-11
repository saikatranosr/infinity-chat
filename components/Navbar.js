import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

function Navbar() {
  return (
    <nav className={styles.nav}>
        <div className="titleContainer">
          <img alt="logo" className={styles.logo} src="/media/logo.svg" />
        </div>
        <div>
          <span className={`material-icons ${styles.moreMenu}`}>more_vert</span>
        </div>
      </nav>
  )
}

export default Navbar