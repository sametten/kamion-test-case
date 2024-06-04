'use client'

// React
import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';


// Styles
import styles from './style.module.css';

export default memo(function LogoAtom(): React.JSX.Element {

    return (
        <Link href={'/'} className={styles['logo-atom']}>
            <Image src='kamion-logo.svg' width={40} height={40} alt='Kamion'/>
            <span><strong>Kamion®</strong><br />Yükveren Paneli</span>
        </Link>
    )
});