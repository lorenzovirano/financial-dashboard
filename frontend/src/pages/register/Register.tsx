import React, { useState } from 'react';
import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonInput, IonItem, IonButton, useIonRouter } from '@ionic/react';
import Layout from '../../components/layout/Layout';
import './Register.css';

const Register: React.FC = () => {
    const navigation = useIonRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const doRegisterAndLogin = async (e: any) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            // 1. Chiamata di Registrazione al backend Fastify
            const regResponse = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const regRes = await regResponse.json();
            if (!regResponse.ok) {
                throw new Error(regRes.message || 'Errore durante la registrazione');
            }

            // 2. Se la registrazione è ok, facciamo subito il LOGIN automatico in background!
            const loginResponse = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const loginRes = await loginResponse.json();
            if (!loginResponse.ok) {
                throw new Error('Registrazione avvenuta, ma errore nel login automatico');
            }

            // 3. Salviamo il token JWT reale e atterriamo direttamente dentro l'app (/app)
            localStorage.setItem("jwt", loginRes.token);
            navigation.push('/app', 'root', 'replace');

        } catch (err: any) {
            console.log(err.message);
            setErrorMessage(err.message || 'Errore di connessione');
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sign Up</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Layout>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='12'>
                                <h1 className='page-title'>Registrati a Budget Buddy!</h1>
                                
                                {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

                                <form onSubmit={doRegisterAndLogin}>
                                    <div className="container-input">
                                        <IonInput fill="solid" className='ion-no-padding' label="Username" labelPlacement="floating" type="text" required value={username} onIonInput={(e) => setUsername(e.detail.value ?? '')} />
                                        <IonInput fill="solid" className='ion-no-padding' label="Email" labelPlacement="floating" type="email" required value={email} onIonInput={(e) => setEmail(e.detail.value ?? '')} />
                                        <IonInput fill="solid" className='ion-no-padding' label="Password" labelPlacement="floating" type="password" required value={password} onIonInput={(e) => setPassword(e.detail.value ?? '')} />
                                    </div>
                                    <IonButton type='submit' expand='full' style={{ marginTop: '20px' }}>
                                        Registrati ed entra
                                    </IonButton>
                                </form>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem routerLink='/' className='ion-no-padding' lines='none'>
                                    Hai già un account? Accedi
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </Layout>
            </IonContent>
        </IonPage>
    )
}

export default Register;