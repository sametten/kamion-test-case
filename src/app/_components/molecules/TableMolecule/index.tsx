'use client';

// React
import { memo, useMemo } from 'react';

// Styles
import styles from './style.module.css';

/**
 * TableHeadMolecule
 */

export const TableHeadMolecule = (props: React.TableHTMLAttributes<HTMLTableSectionElement>): React.JSX.Element => {
    return (
        <thead className={styles['table-molecule__head']} {...props}>
            {props.children}
        </thead>
    )
}

/**
 * TableHeadCellMolecule
 */

export const TableHeadCellMolecule = (props: React.TableHTMLAttributes<HTMLTableCellElement>): React.JSX.Element => {
    return (
        <th {...props}>
            <span>
                {props.children}
            </span>
        </th>
    )
}

/**
 * TableBodyMolecule
 */

export const TableBodyMolecule = (props: React.TableHTMLAttributes<HTMLTableSectionElement>): React.JSX.Element => {
    return (
        <tbody className={styles['table-molecule__body']} {...props}>
            {props.children}
        </tbody>
    )
}

/**
 * TableRowMolecule
 */

export const TableRowMolecule = (props: React.TableHTMLAttributes<HTMLTableRowElement>): React.JSX.Element => {
    return (
        <tr {...props}>
            {props.children}
        </tr>
    )
}

/**
 * TableCellMolecule
 */

export const TableCellMolecule = (props: React.TdHTMLAttributes<HTMLTableCellElement>): React.JSX.Element => {
    return (
        <td {...props}>
            {props.children}
        </td>
    )
}

/**
 * TableMolecule
 */

export interface TableMoleculeProps extends React.TableHTMLAttributes<HTMLTableElement> {
    children: React.ReactNode;
    skeleton?: boolean;
}

export default memo(function TableMolecule(props: TableMoleculeProps): React.JSX.Element {

    // Props
    const { skeleton, ...tableProps } = props;

    // Class name
    const className = useMemo(() => (
        `${styles['table-molecule']}
        ${skeleton ? styles['--skeleton'] : ''}`
    ), [skeleton]);

    return (
        <table className={className} {...tableProps}>
            {props.children}
        </table>
    )
});