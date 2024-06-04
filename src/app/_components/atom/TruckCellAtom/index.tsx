'use client'

// React
import { memo, useMemo } from 'react';

// Components
import IconAtom, { IconAtomProps } from '@/app/_components/atom/IconAtom';

// Styles
import styles from './style.module.css';

/**
 * TruckCellAtom
 */

export type TruckCellAtomProps = {
    icon?: IconAtomProps['name'];
    plateNumber: string;
    truckModel: string;
    skeleton?: boolean;
}

const defaultCompanyCellAtomProps: TruckCellAtomProps = {
    icon: 'truck',
    plateNumber: '34 TRY 1234',
    truckModel: 'Truck Model',
}

export default memo(function CompanyCellAtom(extProps: TruckCellAtomProps): React.JSX.Element {

    // Props
    const props = useMemo(() => ({ ...defaultCompanyCellAtomProps, ...extProps }), [extProps]);

    return (
        <>
            {!props.skeleton &&
                <div className={styles['truck-cell-atom']}>
                    <div className={styles['truck-cell-atom__icon']}>
                        <IconAtom name={props.icon as IconAtomProps['name']} />
                    </div>
                    <span className={styles['truck-cell-atom__content']}>
                        <strong>{props.plateNumber}</strong>
                        {props.truckModel}
                    </span>
                </div>
            }
            {props.skeleton &&
                <div className={styles['truck-cell-atom-skeleton']}>
                    <div className={styles['truck-cell-atom-skeleton__icon']}></div>
                    <div className={styles['truck-cell-atom-skeleton__content']}>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            }          
        </>
      
    )
});