import './Payments.css'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from "@ionic/react"

const Payments: React.FC = () => {
    return(
        <IonPage>
            <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='start'>
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Payments</IonTitle>
                    </IonToolbar>
            </IonHeader>
        </IonPage>
    )
}

export default Payments;