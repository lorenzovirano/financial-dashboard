import './Login.css'
import { IonPage, IonHeader, IonToolbar, IonTitle, useIonRouter, IonContent, IonButton, IonInput, IonImg, IonItem, IonGrid, IonCol, IonRow } from '@ionic/react';
import { useState } from 'react'
import Layout from '../../components/layout/Layout';

const Login: React.FC = () => {
    const navigation = useIonRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const doLogin = async (e?: any) => {
        if (e) e.preventDefault();
        setErrorMessage("");

        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });

            const res = await response.json();

            if (!response.ok) {
                throw new Error(res.message || 'Errore durante il login');
            }

            // Salviamo il token JWT reale restituito dal nostro server Fastify
            localStorage.setItem("jwt", res.token);
            
            // Reindirizziamo alla dashboard principale
            navigation.push('/app', 'root', 'replace');
        } catch (err: any) {
            console.log(err.message);
            setErrorMessage(err.message || 'Credenziali non valide');
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Layout>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='12'>
                                <h1 className='page-title'>Accedi a Budget Buddy!</h1>
                                <IonImg src='assets/images/login.png' style={{height: "250px"}}/>
                                
                                {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

                                <form onSubmit={doLogin}>
                                    <IonInput className='login__input' 
                                        placeholder='Username o Email'
                                        required
                                        type='text'
                                        value={username}
                                        onIonInput={(e) => setUsername(e.detail.value ?? '')}>
                                    </IonInput>
                                    
                                    <IonInput className='login__input' 
                                        type='password' 
                                        placeholder='Password' 
                                        required
                                        value={password}
                                        onIonInput={(e) => setPassword(e.detail.value ?? '')}>
                                    </IonInput>

                                    <a href='/' className='password-recovery'>Non ricordo la password</a>
                                    
                                    <IonButton type='submit' expand='full' className='login__btn'>
                                        Login
                                    </IonButton>
                                </form>
                                <IonItem routerLink='/signup' className='ion-no-padding' lines='none'>
                                    Non hai un account? Registrati
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </Layout>
            </IonContent>
        </IonPage >
    )
}

export default Login;