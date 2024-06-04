'use client'

// React
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Styles
import styles from './style.module.css';

// Partials
import HeaderOrganisms from '@/app/_components/organisms/HeaderOrganisms';
import FooterOrganisms from '@/app/_components/organisms/FooterOrganisms';

// Redux
import type { RootState } from '@/app/_store/store';
import { useSelector } from 'react-redux';

/**
 * Layout component
 */

type LayoutProps = {
    children: React.ReactNode;
}

export default function Layout(props: LayoutProps): React.JSX.Element {

    // Router
    const router = useRouter();

    // Store
    const user = useSelector((state: RootState) => state.user.user);

    // Redirect to dashboard
    useEffect(() => {
        if(!user.token) {
            router.replace('/login');
        }
    }, [router, user.token]);

    return (
        <>
            <HeaderOrganisms />
            <main>
                {props.children}
            </main>
            <FooterOrganisms />        
        </>
    )
}