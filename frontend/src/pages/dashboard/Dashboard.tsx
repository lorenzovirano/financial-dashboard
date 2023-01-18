import './Dashboard.css';
import { IonCol, IonGrid, IonRow, IonHeader, IonTitle, IonToolbar, IonPage, IonButtons, IonMenuButton, IonContent, IonFab, IonFabButton, IonIcon, IonFabList, IonButton} from '@ionic/react';
import { add } from 'ionicons/icons'
import Layout from '../../components/layout/Layout';
import TotalBalance from '../../components/widget/totalBalance/TotalBalance';
import Slider from '../../components/widget/slider/Slider';

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
                                <TotalBalance currency='$' total={6500.00}/>
                            </IonCol>
                            <IonCol>
                                <Slider size={'80%'} title={"Entrate"}/>
                                <Slider size={'24%'} title={"Uscite"}/>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </Layout>
                <IonFab slot="fixed" horizontal="end" vertical="bottom">
                    <IonFabButton>
                        <IonIcon icon={add} />
                    </IonFabButton>
                    <IonFabList side='top'>
                        <IonButton>Entrata</IonButton>
                    </IonFabList>
                    <IonFabList side='start'>
                        <IonButton>Uscita</IonButton>
                    </IonFabList>
                </IonFab>
            </IonContent>
        </IonPage>
    );
}

export default Dashboard; 