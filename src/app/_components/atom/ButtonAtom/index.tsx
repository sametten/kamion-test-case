'use client';

// React
import { memo, useMemo } from 'react'
import type { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

// Components
import IconAtom, { IconAtomProps } from '@/app/_components/atom/IconAtom';
import Spinner from '../SpinnerAtom';

// Styles
import styles from './style.module.css'

/**
 * ButtonAtom
 */

export interface ButtonAtomProps extends ButtonHTMLAttributes<HTMLButtonElement & HTMLAnchorElement> {
    href?: string;
    block?: boolean;
    skeleton?: boolean;
    busy?: boolean;
    icon?: IconAtomProps['name'];
    disabled?: boolean;
    children: React.ReactNode;
}

const defaultButtonAtomProps = {
    children: 'Button',
}

/**
 * InnerContent
 */

type InnerProps = {
    icon?: IconAtomProps['name'];
    busy?: boolean;
    children: React.ReactNode;
}

function InnerContent(props: InnerProps): React.JSX.Element {
    return (
        <>
            {props.children}
            {props.icon && !props.busy && <IconAtom name={props.icon} />}
            {props.busy && <Spinner />}
        </>
    )
};

/**
 * PLainButton
 */

const PlainButton = (props: (ButtonAtomProps & { className: string })): React.JSX.Element => {
    const { skeleton, block, busy, disabled, className, ...buttonProps } = props;
    return (
        <button {...buttonProps} className={props.className}>
            <InnerContent {...props}>{props.children}</InnerContent>
        </button>
    )
};

/**
 * NativeLinkButton
 */

const NativeLinkButton = (props: (ButtonAtomProps & { className: string })): React.JSX.Element => {
    const { skeleton, block, busy, disabled, ...linkProps } = props;

    return (
        <Link {...linkProps} className={props.className} href={props.href || '/'}>
            <InnerContent {...props}>{props.children}</InnerContent>
        </Link>
    )
};

/**
 * AnchorButton
 */

const AnchorButton = (props: (ButtonAtomProps & { className: string })): React.JSX.Element => {
    const { skeleton, block, busy, disabled, ...anchorProps } = props;

    return (
        <a {...anchorProps} className={props.className}>
            <InnerContent {...props}>{props.children}</InnerContent>
        </a>
    )
};

/**
 * ButtonAtom
 */

export default memo(function Button(extProps: ButtonAtomProps): React.JSX.Element {

    // Props
    const props = useMemo(() => ({ ...defaultButtonAtomProps, ...extProps }), [extProps]);

    // Class name
    const clasName = useMemo(() => (
        `${styles['button-atom']}
        ${props.disabled || props.busy ? styles['--disabled'] : ''}
        ${props.block ? styles['--block'] : ''}`
    ), [props.disabled, props.busy, props.block]);

    return (
        !props.skeleton ?
            props.href ? 
                props.href.startsWith('http') ? 
                    <AnchorButton {...props} className={clasName} />
                    : <NativeLinkButton {...props} className={clasName} />
                : <PlainButton {...props} className={clasName} />
            : <div className={`${styles['button-atom-skeleton']} ${props.block ? styles['--block'] : ''}`}>{props.children}</div>
    )
});