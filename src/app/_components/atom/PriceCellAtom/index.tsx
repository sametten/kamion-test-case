'use client'

// React
import { memo, useMemo } from 'react';

// Utils
import { formatToMoney } from '@/app/_utils/';

// Styles
import styles from './style.module.css';

/**
 * PriceCellAtom
 */

export type PriceCellAtomProps = {
    price: string;
    skeleton?: boolean;
}

const defaultPriceCellAtomProps: PriceCellAtomProps = {
    price: '0 ₺',
}

export default memo(function PriceCellAtom(extProps: PriceCellAtomProps): React.JSX.Element {

    // Props
    const props = useMemo(() => ({ ...defaultPriceCellAtomProps, ...extProps }), [extProps]);

    return (
        <>
            {!props.skeleton &&
                <div className={styles['price-cell-atom']}>
                    <span className={styles['price-cell-atom__content']}>
                        {formatToMoney(props.price)}
                    </span>
                </div>
            }
            {props.skeleton &&
                <div className={styles['price-cell-atom-skeleton']}>
                    <span className={styles['price-cell-atom-skeleton__content']}></span>
                </div>
            }
        </>
    )
});