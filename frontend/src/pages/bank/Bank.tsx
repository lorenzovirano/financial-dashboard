import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonContent, IonGrid, IonRow, IonCol, IonInput, IonList, IonButton, useIonRouter, NavContext } from '@ionic/react';
import { useState, useContext, useCallback } from 'react';
import Layout from '../../components/layout/Layout';
import './Bank.css';

const Bank: React.FC = () => {
    const {navigate} = useContext(NavContext);
    const redirect = useCallback(
        () => navigate('/app/dashboard', 'back'),
        [navigate]
      );
    
    const [bankName, setBankName] = useState<string>("");
    const navigation = useIonRouter();
    
    const storeName = async (nameSelected: any) => {
        setBankName(nameSelected)
    }
    
    let submitBank = async () => {
        let jwt = localStorage.getItem("jwt")
        if (jwt === "null" || !jwt) {
            navigation.push('/', 'root', 'replace');
            return;
        }
        
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', jwt);
        
        let payload = {
            "bankName": bankName,
        }

        try {
            // Aggiornato alla porta 8080 e rimosso il prefisso /api
            await fetch('http://localhost:8080/bank/create', {
                method: "POST",
                headers: headers,
                body: JSON.stringify(payload)
            });
            redirect();
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Banche</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Layout>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='12'>
                                <IonList>
                                    <IonInput fill="outline" className='ion-no-padding' label="Banca" labelPlacement="floating" placeholder="Inserisci nome banca..." onIonInput={(e) => storeName(e.detail.value)} />
                                    <IonButton expand='full' onClick={(e) => submitBank()}>
                                        Invia
                                    </IonButton>
                                </IonList>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </Layout>
            </IonContent>
        </IonPage>
    )
}

export default Bank;