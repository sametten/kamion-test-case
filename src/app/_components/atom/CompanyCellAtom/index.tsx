'use client'

// React
import { memo, useMemo } from 'react';

// Components
import IconAtom, { IconAtomProps } from '@/app/_components/atom/IconAtom';

// Styles
import styles from './style.module.css';

/**
 * CompanyCellAtom
 */

export type CompanyCellAtomProps = {
    icon?: IconAtomProps['name'];
    skeleton?: boolean;
    name: string;
}

const defaultCompanyCellAtomProps: CompanyCellAtomProps = {
    icon: 'cube',
    name: 'Company Name',
}

export default memo(function CompanyCellAtom(extProps: CompanyCellAtomProps): React.JSX.Element {

    // Props
    const props = useMemo(() => ({ ...defaultCompanyCellAtomProps, ...extProps }), [extProps]);

    return (
        <>
            {!props.skeleton &&
                <div className={styles['company-cell-atom']}>
                    <div className={styles['company-cell-atom__icon']}>
                        <IconAtom name={props.icon as IconAtomProps['name']} />
                    </div>
                    <span className={styles['company-cell-atom__content']}>
                        {props.name}
                    </span>
                </div>
            }
            {props.skeleton &&
                <div className={styles['company-cell-atom-skeleton']}>
                    <div className={styles['company-cell-atom-skeleton__icon']}></div>
                    <div className={styles['company-cell-atom-skeleton__content']}>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            }
        </>

    )
});