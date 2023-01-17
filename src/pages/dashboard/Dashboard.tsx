import './Dashboard.css';
import { IonCol, IonGrid, IonRow, IonHeader, IonTitle, IonToolbar, IonPage, IonButtons, IonMenuButton, IonContent} from '@ionic/react';
import Layout from '../../components/layout/Layout';
import TotalBalance from '../../components/widget/TotalBalance';

const Dashboard: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='start'>
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Financial Dashboard</IonTitle>
                    </IonToolbar>
            </IonHeader>
            <IonContent>
                <Layout>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='12'>
                                <TotalBalance />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </Layout>
            </IonContent>
        </IonPage>
    );
}

export default Dashboard; 