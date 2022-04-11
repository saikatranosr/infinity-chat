import React from 'react'
import styles from '../styles/Loading.module.css'

function Loading({text}) {
    return (
        <div className="over noselect">
            <div className="promptContainer row">
              <div className={styles.spinner} />
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Loading