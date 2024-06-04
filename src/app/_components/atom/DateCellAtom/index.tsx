'use client'

// React
import { memo, useMemo } from 'react';

// Utils
import { formatDate } from '@/app/_utils/';

// Styles
import styles from './style.module.css';

/**
 * DateCellAtom
 */

export type DateCellAtomProps = {
    date: string;
    skeleton?: boolean;
}

const defaultCompanyCellAtomProps: DateCellAtomProps = {
    date: 'test',
}

export default memo(function DateCellAtom(extProps: DateCellAtomProps): React.JSX.Element {

    // Props
    const props = useMemo(() => ({ ...defaultCompanyCellAtomProps, ...extProps }), [extProps]);

    return (
        <>
            {!props.skeleton && 
                <div className={styles['date-cell-atom']}>
                    <span className={styles['date-cell-atom__content']}>
                        {formatDate(props.date)}
                    </span>
                </div>
            }
            {props.skeleton &&
                <div className={styles['date-cell-atom-skeleton']}>
                    <span className={styles['date-cell-atom-skeleton__content']}></span>
                </div>            
            }
        </>
    )
});