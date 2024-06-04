'use client'

// React
import { memo, useMemo } from 'react';

// Styles
import styles from './style.module.css';

/**
 * TagCellAtom
 */

export type RouteCellAtomProps = {
    fromLabel: string;
    fromCity: string; 
    fromDistrict: string;
    toLabel: string;
    toCity: string; 
    toDistrict: string;
    skeleton?: boolean;
}

const defaultRouteCellAtomProps: RouteCellAtomProps = {
    fromLabel: '',
    fromCity: '',
    fromDistrict: '',
    toLabel: '',
    toCity: '',
    toDistrict: '',
}

export default memo(function RouteCellAtom(extProps: RouteCellAtomProps): React.JSX.Element {

    // Props
    const props = useMemo(() => ({ ...defaultRouteCellAtomProps, ...extProps }), [extProps]);

    return (
        <>
            {!props.skeleton && 
                <div className={styles['route-cell-atom']}>
                    <div className={styles['route-cell-atom__row']}>
                        <i></i>
                        <span>
                            <strong>{props.fromLabel},</strong> {[props.fromCity, props.fromDistrict].join(', ')}
                        </span>
                        
                    </div>
                    <div className={styles['route-cell-atom__row']}>
                        <i></i>
                        <span>
                            <strong>{props.toLabel},</strong> {[props.toCity, props.toDistrict].join(', ')}
                        </span>
                    </div>
                </div>
            }

            {props.skeleton &&
                <div className={styles['route-cell-atom-skeleton']}>
                    <span></span>
                    <span></span>
                </div>
            }
        </>

    )
});