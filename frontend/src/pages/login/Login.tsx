import './Login.css'
import { IonPage, IonHeader, IonToolbar, IonTitle, useIonRouter, IonContent, IonButton } from '@ionic/react';

const Login: React.FC = () => {
    const navigation = useIonRouter();

    const doLogin = () => {
        navigation.push('/app', 'root', 'replace');
    }


    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonButton onClick={() => doLogin()} expand='full'>
                    Login
                </IonButton>   
            </IonContent>
        </IonPage>
    )
}

export default Login;