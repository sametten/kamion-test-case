'use client'

// React
import { memo, useMemo } from 'react';

// Components 
import InputAtom from '@/app/_components/atom/InputAtom';

// Styles
import styles from './style.module.css';

/**
 * PageHeaderMolecule
 */

export default memo(function PageHeaderMolecule(): React.JSX.Element {

    return (
        <div className={styles['page-header-molecule']}>
            <div className={styles['page-header-molecule__title']}>
                <h1>Taşıtlarım</h1>
            </div>
            <div className={styles['page-header-molecule__action']}>
                <InputAtom search label="Arayın.." iconPosition='right' icon='search' />
            </div>
        </div>
    )
});