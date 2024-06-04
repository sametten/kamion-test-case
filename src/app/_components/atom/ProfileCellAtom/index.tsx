'use client'

// React
import { memo, useMemo } from 'react';
import Image from 'next/image';

// Utils
import { formatToPhoneNumber } from '@/app/_utils/';

// Styles
import styles from './style.module.css';

/**
 * ProfileCellAtom
 */

export type ProfileCellAtomProps = {
    image: string;
    fullName: string;
    phoneNumber: string;
    skeleton?: boolean;
}

const defaultCompanyCellAtomProps: ProfileCellAtomProps = {
    image: '/dummy-profile.jpg',
    fullName: 'John Doe',
    phoneNumber: '0532 123 45 67',
}

export default memo(function CompanyCellAtom(extProps: ProfileCellAtomProps): React.JSX.Element {

    // Props
    const props = useMemo(() => ({ ...defaultCompanyCellAtomProps, ...extProps }), [extProps]);

    return (
        <>
            {!props.skeleton &&
                <div className={styles['profile-cell-atom']}>
                    <div className={styles['profile-cell-atom__img']}>
                        <Image src={props.image} width={40} height={40} alt={props.fullName}/>
                    </div>
                    <span className={styles['profile-cell-atom__content']}>
                        <strong>{props.fullName}</strong>
                        {props.phoneNumber !== '-' ? formatToPhoneNumber(props.phoneNumber) : '-'}
                    </span>
                </div>        
            }
            {props.skeleton &&
                <div className={styles['profile-cell-atom-skeleton']}>
                    <div className={styles['profile-cell-atom-skeleton__icon']}></div>
                    <div className={styles['profile-cell-atom-skeleton__content']}>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            }              
        </>
    )
});