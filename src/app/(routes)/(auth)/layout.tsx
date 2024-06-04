// Styles 
import styles from './style.module.css'

/**
 * Auth layout
 */

type AuthLayoutProps = {
    children: React.ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps): React.JSX.Element {
    return (
        <div className={styles['auth-layout']}>
            <div className={styles['auth-layout__inner']}>
                <div className={styles['inner__content']}>
                    <div className={styles['content__wrapper']}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}