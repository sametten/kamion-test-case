'use client'

// React
import { useState, useCallback, memo, useEffect } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation'

// Components
import ButtonAtom from '@/app/_components/atom/ButtonAtom';
import InputAtom from '@/app/_components/atom/InputAtom';
import IconAtom from '@/app/_components/atom/IconAtom';

// Utils
import { checkEmail } from '@/app/_utils';

// Redux
import type { RootState, AppDispatch } from '@/app/_store/store';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '@/app/_store/userSlice';

// Styles
import style from './style.module.css'

export default memo(function LoginPage(): React.JSX.Element {

    // Router
    const router = useRouter();

    // Store
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const userLoginLoading = useSelector((state: RootState) => state.user.userLoginLoading);
    const userLoginError = useSelector((state: RootState) => state.user.userLoginError);

    // Email input handling
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [emailInputUsed, setEmailInputUsed] = useState<boolean>(false);

    const emailValidation = useCallback((email: string) => {
        if (!email) {
            return 'Email cannot be empty!';
        } else if (!checkEmail(email)) {
            return 'Please enter a valid email!';
        } else {
            return '';
        }
    }, []);    

    const emailInputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);

        if(emailInputUsed) {
            setEmailError(emailValidation(e.target.value));
        }
    }, [emailInputUsed, emailValidation]);

    const emailInputOnBlur = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailInputUsed(true);
        setEmailError(emailValidation(e.target.value));
    }, [emailValidation]);

    // Password input handling
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [passwordInputUsed, setPasswordInputUsed] = useState<boolean>(false);

    const passwordValidation = useCallback((password: string) => {
        if (!password) {
            return 'Password cannot be empty!';
        } else if (password.length < 6) {
            return 'Please enter a valid password!';
        } else {
            return '';
        }
    }, []);

    const passwordInputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);

        if(passwordInputUsed) {
            setPasswordError(passwordValidation(e.target.value));
        }
    }, [passwordInputUsed, passwordValidation]);

    const passwordInputOnBlur = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordInputUsed(true);
        setPasswordError(passwordValidation(e.target.value));
    }, [passwordValidation]);

    // Login button handling
    const loginButtonOnClick = useCallback(() => {
        dispatch(userLogin({ email, password }));
    }, [email, password, dispatch]);

    // Redirect to dashboard
    useEffect(() => {
        if(user.token) {
            router.push('/');
        }
    }, [router, user.token]);
    
    return (
        <div className={style['login']}>

            {/* Sign Up Splash */}
            <div className={style['login__sign-up-splash']} style={{ backgroundImage: `url('./sign-up-splash-bg.jpg')` }}>
                <div className={style['sign-up-splash__inner']}>
                    <span>ONE PLATFORM FOR ALL ROAD FREIGHT</span>
                    <h6>Visibility, Efficiency, Sustainability</h6>
                    <p><strong>MENA’s</strong> Most Efficient Digital Freight Network</p>
                    <div className={style['inner__cta']}>
                        <a href='#' className={style['cta__button']}>
                            <span>Join the Kamion Logistics Network <strong>Sing Up</strong></span>
                            <IconAtom name='arrow-right' />
                        </a>
                    </div>
                </div>
            </div>

            {/* Login Form */}
            <div className={style['login__form']}>

                {/* Login Header */}
                <div className={style['form__header']}>
                    <Image src='kamion-circled-logo.svg' width={56} height={56} alt='Kamion' />
                    <h1>
                        <strong>Kamion ®</strong><br />
                        Dashboard Log In
                    </h1>
                </div>

                {/* Login Form */}
                <div className={style['form__inputs']}>
                    <form>
                        <InputAtom 
                            label='Email' 
                            disabled={false} 
                            block={true} 
                            type='email' 
                            icon='message' 
                            iconPosition='right'
                            value={email} 
                            error={emailError}
                            onChange={emailInputOnChange}
                            onBlur={emailInputOnBlur}
                        />
                        <InputAtom 
                            label='Password' 
                            block={true} 
                            type='password' 
                            icon='lock' 
                            iconPosition='right'
                            value={password}
                            error={passwordError}
                            onChange={passwordInputOnChange}
                            onBlur={passwordInputOnBlur}
                        />
                        <div className={style['inputs__button']}>
                            <ButtonAtom 
                                type='button' 
                                icon='arrow-right'
                                busy={userLoginLoading}
                                onClick={loginButtonOnClick}
                            >
                                Login
                            </ButtonAtom>
                        </div>
                    </form>
                </div>

                {/* Login Footer */}
                <div className={style['form__footer']}>
                    <p>@ Copyright 2024, <strong>Kamion Logistics</strong> - All rights reserved.</p>
                </div>
            </div>
        </div>
    )
});