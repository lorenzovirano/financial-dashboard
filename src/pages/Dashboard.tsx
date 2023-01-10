import './Dashboard.css';
import { IonCol, IonGrid, IonRow, IonHeader, IonTitle, IonToolbar} from '@ionic/react';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Dashboard</IonTitle>
                </IonToolbar>
            </IonHeader>
            <Layout>
                <IonGrid>
                    <IonRow>
                        <IonCol size='6'>
                            <h1>Ciao</h1>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </Layout>
        </>
    );
}

export default Dashboard; 