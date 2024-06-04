'use client'

// React
import Providers from '@/app/_store/providers';

// User slice
import { userSlice } from '@/app/_store/userSlice';

import '@/app/_assets/styles/default.css';

/**
 * Rootlayout
 */

type RootLayoutProps = {
    children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps): React.JSX.Element {
    return (
        <html lang="en">
            <Providers>
                <body>{props.children}</body>
            </Providers>
        </html>
    )
}  