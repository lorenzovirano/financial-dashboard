import './Dashboard.css';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
    return (
        <>
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