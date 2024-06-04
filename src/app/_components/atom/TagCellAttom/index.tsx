'use client'

// React
import { memo, useMemo } from 'react';

// Styles
import styles from './style.module.css';

/**
 * TagCellAtom
 */

export type TagCellAtomProps = {
    type?: 'success' | 'warning' | 'danger' | 'info';
    text: string;
    block?: boolean;
    skeleton?: boolean;
}

const defaultTagCellAtomProps: TagCellAtomProps = {
    type: 'info',
    text: 'Tag',
}

export default memo(function TagCellAtom(extProps: TagCellAtomProps): React.JSX.Element {

    // Props
    const props = useMemo(() => ({ ...defaultTagCellAtomProps, ...extProps }), [extProps]);

    // Class name
    const clasName = useMemo(() => (
        `${styles['tag-cell-atom']}
        ${styles[`tag-cell-atom--${props.type}`]}
        ${props.block ? styles['--block'] : ''}`
    ), [props.block, props.type]);

    return (
        <>
            {!props.skeleton &&
                <div className={clasName}>
                    <span className={styles['tag-cell-atom__content']}>
                        {props.text}
                    </span>
                </div>
            }
            {props.skeleton &&
                <div className={styles['tag-cell-atom-skeleton']}>
                    <span className={styles['tag-cell-atom-skeleton__content']}></span>
                </div>
            }
        </>
    )
});