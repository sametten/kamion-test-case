'use client'

// React
import { memo } from 'react';

// Logo
import LogoAtom from '@/app/_components/atom/LogoAtom';

// Styles
import styles from './style.module.css';

export default memo(function HeaderOrganisms(): React.JSX.Element {

    return (
        <header className={styles['header']}>
            <div className={styles['header__inner']}>
                <div className={styles['header__logo']}>
                    <LogoAtom />
                </div>
            </div>
        </header>
    )
});