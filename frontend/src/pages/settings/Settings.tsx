import './Settings.css'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonRow, IonGrid, IonCol, IonSearchbar, IonList, IonItem } from "@ionic/react"
import Layout from '../../components/layout/Layout';

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
            <IonContent>
                <Layout>
                    <IonSearchbar animated={true} placeholder="Animated"></IonSearchbar>
                    <IonList>
                        <IonItem>Account</IonItem>
                        <IonItem>Conti</IonItem>
                        <IonItem>Pagamenti</IonItem>
                    </IonList>
                </Layout>
            </IonContent>
        </IonPage>
    )
}

export default Settings;