import styles from '../styles/DownArrow.module.css'

export default function DownArrow() {
    return (
        <div className={`${styles.end} ${styles.goToEnd} noselect`}>
            <span className="material-icons">arrow_downward</span>
            <span className={styles.msgCount} />
        </div>
    )
}