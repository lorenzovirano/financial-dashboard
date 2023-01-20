import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import Layout from '../../components/layout/Layout';
import ImportCards from '../../components/widget/importCards/ImportCards';
import {downloadOutline} from 'ionicons/icons'
import './Import.css'

const Import: React.FC = () => {
    return(
       <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Import</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Layout>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='12'>
                                <p>Importa le entrate/uscite del tuo conto da quì</p>
                                <IonButton expand='block'>
                                    <IonIcon slot="icon-only" icon={downloadOutline}></IonIcon>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </Layout>
                <section className="section-imports">
                    <Layout>
                        <IonGrid>
                            <IonRow>
                                <IonCol size='6'>
                                    <ImportCards />
                                </IonCol>
                                <IonCol size='6'>
                                    <ImportCards />
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </Layout>                   
                </section>
            </IonContent>
       </IonPage>
    )
}

export default Import;