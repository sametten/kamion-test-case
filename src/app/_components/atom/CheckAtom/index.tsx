'use client'

// React
import { memo } from 'react';

// Styles
import styles from './style.module.css';

/**
 * CheckAtom
 */

export type CheckAtomProps = {
    skeleton?: boolean;
}

export default memo(function CheckAtom(props: CheckAtomProps): React.JSX.Element {

    return (
        <>
           {!props.skeleton && <div className={styles['check-atom']}></div>}
           {props.skeleton && <div className={styles['check-atom--skeleton']}></div>}
        </>
        
    )
});