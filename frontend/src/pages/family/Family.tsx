import './Family.css'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from "@ionic/react"

const Family: React.FC = () => {
    return(
        <IonPage>
            <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='start'>
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Family</IonTitle>
                    </IonToolbar>
            </IonHeader>
        </IonPage>
    )
}

export default Family;