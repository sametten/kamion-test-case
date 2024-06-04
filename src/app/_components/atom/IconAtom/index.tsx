'use client';

// Utils
import { formatToPascalCase } from '@/app/_utils';

// Icons
import ArrowDown from './svg/arrow-down.svg';
import ArrowLeft from './svg/arrow-left.svg';
import ArrowRight from './svg/arrow-right.svg';
import ArrowUp from './svg/arrow-up.svg';
import Cube from './svg/cube.svg';
import Lock from './svg/lock.svg';
import Message from './svg/message.svg';
import Search from './svg/search.svg';
import Truck from './svg/truck.svg';

/**
 * Icon Atom
 */

export type IconAtomProps = {
    name: 'arrow-down' | 'arrow-left' | 'arrow-right' | 'arrow-up' | 'cube' | 'lock' | 'message' | 'search' | 'truck';
}

const defaultIconProps = {
    name: 'cube'
}

export default function Button(extProps: IconAtomProps): React.JSX.Element {

    // Props
    const props = { ...defaultIconProps, ...extProps};

    // All Icons
    const allIcons: { [key: string]: any } = { 
        ArrowDown,
        ArrowLeft,
        ArrowRight,
        ArrowUp,
        Cube,
        Lock,
        Message,
        Search,
        Truck
    };

    return (
        <>{allIcons[formatToPascalCase(props.name)] ? allIcons[formatToPascalCase(props.name)]() : allIcons['Cube']}</>
    )
}

