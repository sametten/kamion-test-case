'use client'

// React
import { memo } from 'react';

// Styles
import styles from './style.module.css';

export default memo(function HeaderOrganisms(): React.JSX.Element {

    return (
        <footer className={styles['footer']}>
            <div className={styles['footer__inner']}>
                <div className={styles['footer__logo']}>
                    Just a poor footer
                </div>
            </div>
        </footer>
    )
});