import './Settings.css'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from "@ionic/react"

const Settings: React.FC = () => {
    return(
        <IonPage>
            <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='start'>
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Settings</IonTitle>
                    </IonToolbar>
            </IonHeader>
        </IonPage>
    )
}

export default Settings;