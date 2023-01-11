import './Dashboard.css';
import { IonCol, IonGrid, IonRow, IonHeader, IonTitle, IonToolbar, IonPage, IonButtons, IonMenuButton, IonContent} from '@ionic/react';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='start'>
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Dashboard</IonTitle>
                    </IonToolbar>
            </IonHeader>
            <IonContent>
                <Layout>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='6'>
                                <h1>Ciao</h1>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </Layout>
            </IonContent>
        </IonPage>
    );
}

export default Dashboard; 