import './Login.css'
import { IonPage, IonHeader, IonToolbar, IonTitle, useIonRouter, IonContent, IonButton, IonInput } from '@ionic/react';
import { useState } from 'react'
import { key } from 'ionicons/icons';

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

                <form  >
                    <IonInput placeholder='Username'
                        required
                        type="email"
                        onIonChange={(e: any) => setUsername(e.target.value)}>
                    </IonInput>
                    <IonInput type='password' placeholder='Password' onIonInput={(e: any) => setPassword(e.target.value)}></IonInput>

                    <IonButton onClick={doLogin} expand='full'>
                        Login
                    </IonButton>
                </form>

            </IonContent>
        </IonPage >
    )
}



export default Login;