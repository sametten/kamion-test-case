'use client'

// React
import { memo, useMemo } from 'react';

// Styles
import styles from './style.module.css';

/**
 * IdCellAtom
 */

export type IdCellAtomProps = {
    id: string | number;
    skeleton?: boolean;
}

const defaultCompanyCellAtomProps: IdCellAtomProps = {
    id: '000000',
}

export default memo(function IdCellAtom(extProps: IdCellAtomProps): React.JSX.Element {

    // Props
    const props = useMemo(() => ({ ...defaultCompanyCellAtomProps, ...extProps }), [extProps]);

    return (
        <>
            {!props.skeleton && 
                <div className={styles['id-cell-atom']}>
                    <span className={styles['id-cell-atom__content']}>
                        {props.id}
                    </span>
                </div>            
            }
            {props.skeleton &&
                <div className={styles['id-cell-atom-skeleton']}>
                    <span className={styles['id-cell-atom-skeleton__content']}></span>
                </div>            
            }
        </>

    )
});