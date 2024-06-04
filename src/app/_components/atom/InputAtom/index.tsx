// React
import { memo, useEffect, useMemo, useState, } from 'react';
import type { InputHTMLAttributes } from 'react';

// Styles
import styles from './style.module.css';

// Components
import IconAtom, { IconAtomProps } from '@/app/_components/atom/IconAtom';

// Utils
import { formatTo } from '@/app/_utils';
import { set } from 'lodash';

/**
 * Input component
 */

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    block?: boolean;
    search?: boolean;
    error?: string;
    icon?: IconAtomProps['name'];
    mask?: string;
    iconPosition?: 'left' | 'right';
    disabled?: boolean;
    skeleton?: boolean;
    label?: string | boolean;
    type?: 'text' | 'password' | 'email' | 'number';
}

const defaultProps: InputProps = {
    disabled: false,
    block: false,
    skeleton: false,
    type: 'text',
}

export default memo(function Input(extProps: InputProps): React.JSX.Element {

    // Props
    const props = useMemo(() => ({ ...defaultProps, ...extProps }), [extProps]);

    // Input value
    const inputValue = useMemo(() => {
        if (props.mask && props.value) {
            return formatTo(props.value as string, props.mask);
        } else {
            return props.value;
        }
    }, [props.value, props.mask]);

    // Input props
    const { label, onChange, iconPosition, icon, error, skeleton, block, value, ...inputProps } = props;

    // Label
    const inputLabel = useMemo(() => (typeof props.label === 'boolean' ? '' : props.label), [props.label]);

    // Input on chnage
    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange && props.mask) {            
            props.onChange({ ...e, target: { ...e.target, value: formatTo(e.target.value, props.mask) } });
        }   else if (props.onChange) {
            props.onChange(e);6935
        }
    };

    // Set filled
    useEffect(() => {
        setInputFilled(!!props.value);
    }, [props.value]);

    // Input on blur
    const [inputFilled, setInputFilled] = useState<boolean>(false);
    const inputOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setInputFilled(!!e.target.value);

        if(props.onBlur) {
            props.onBlur(e);
        }
    }

    // Class name
    const className = useMemo(() => (
        `${styles['input-atom']}
        ${props.search ? styles['--search'] : ''}
        ${inputFilled ? styles['--filled'] : ''}
        ${props.disabled ? styles['--disabled'] : ''}
        ${props.block ? styles['--block'] : ''}
        ${props.error ? styles['--error'] : ''}
        ${props.icon && props.iconPosition ? styles[`--icon-on-${props.iconPosition}`] : ''}`
    ), [props.search, props.disabled, props.block, props.error, props.icon, props.iconPosition, inputFilled]);

    return (
        <>
            {/* Content */}
            {!props.skeleton &&
                <div className={className}>
                    <div className={styles['input-atom__body']}>
                        <input
                            {...inputProps}
                            value={inputValue}
                            onChange={inputOnChange}
                            onBlur={inputOnBlur}
                            className={styles['body__field']}
                        />
                        <label className={styles['body__label']}>{inputLabel}</label>
                        <div className={styles['body__bg']}>
                            {props.icon && <IconAtom name={props.icon} />}
                        </div>
                    </div>
                    { props.error && <span className={styles['input-atom__error']}>{props.error}</span> }
                </div>
            }

            {/* Skeleton */}
            {props.skeleton && 
                <div className={`${styles['input-atom-skeleton']} ${props.block ? styles['--block'] : ''}`}>
                    {props.label && 
                        <div className={styles['input-atom-skeleton__label']}>
                            <span>{props.label}</span>
                        </div>
                    }
                    <div className={styles['input-atom-skeleton__bg']}>{props.placeholder}</div>
                </div>
            }
        </>
    )
});