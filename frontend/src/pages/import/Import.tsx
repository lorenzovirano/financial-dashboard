import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import Layout from '../../components/layout/Layout';
import ImportCards from '../../components/widget/importCards/ImportCards';
import {downloadOutline} from 'ionicons/icons'
import './Import.css'

const Import: React.FC = () => {
    /* Script per calcolare l'altezza della sezione imports */
    let elem = document.querySelector('.section-imports');
    let rect = elem?.getBoundingClientRect();
    let top = rect?.top;
    let height = window.innerHeight - top!;
    /* TODO: Implementare la funzione con useEffect per chiamarla ad ogni caricamento del componente */
    return(
       <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
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
                <section className="section-imports" style={{height: height}}>
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