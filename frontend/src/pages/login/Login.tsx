import './Login.css'
import { IonPage, IonHeader, IonToolbar, IonTitle, useIonRouter, IonContent, IonButton, IonInput, IonImg, IonItem, IonGrid, IonCol, IonRow } from '@ionic/react';
import { useState } from 'react'
import Layout from '../../components/layout/Layout';

const Login: React.FC = () => {
    const navigation = useIonRouter();

    const doLogin = async () => {
        await fetch('http://localhost:4000/users/login', {
            "method": 'POST',
            "body": JSON.stringify({
                username: username,
                password: password
            }),
            "headers": {
                'Content-type': 'application/json',
            },

        })
            .then((response) => {
                let jwt = response.json()
                    .then((res) => {
                        localStorage.setItem("jwt", res.data.token)
                        navigation.push('/app', 'root', 'replace');
                    })
            })
            .catch((err) => {
                console.log(err.message);
            });
        //
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
                                <form>
                                    <IonInput className='login__input' 
                                        placeholder='Username'
                                        required
                                        type='text'
                                        onIonChange={(e: any) => setUsername(e.target.value)}>
                                    </IonInput>
                                    <IonInput className='login__input' type='password' placeholder='Password' onIonInput={(e: any) => setPassword(e.target.value)}></IonInput>
                                    <a href='/' className='password-recovery'>Non ricordo la password</a>
                                    <IonButton onClick={doLogin} expand='full' className='login__btn'>
                                        Login
                                    </IonButton>
                                </form>
                                <IonItem routerLink='/signup' className='ion-no-padding'>
                                    Non hai un account?
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