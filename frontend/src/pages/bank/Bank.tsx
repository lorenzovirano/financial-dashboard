import { IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonContent, IonGrid, IonRow, IonCol, IonInput, IonList, IonItem, IonLabel, IonButton, useIonRouter} from '@ionic/react';
import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import './Bank.css';

const Bank: React.FC = () => {
    interface BankService {
        name: String,
        _id: number
    }

    const [bankName, setBankName] = useState<BankService[]>()
    const navigation = useIonRouter();
    const storeName = async (nameSelected: any) => {
        setBankName(nameSelected)
    }
    
    let submitBank = async () => {
        let jwt = localStorage.getItem("jwt")
        if (jwt === "null" || jwt === undefined) {
            navigation.push('/', 'root', 'replace');
        }
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', jwt || "no");
        let payload = {
            "bankName": bankName,
        }
        await fetch('http://localhost:4000/bank/import', {
            "method": "POST",
            "headers": headers,
            "body": JSON.stringify(payload)
        })
            .then((response) => {
                navigation.push('/app/dashboard', 'root', 'replace');
            })
            .catch((err) => {
                console.log(err)
            })
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
                                    <IonItem fill="outline" className='ion-no-padding'>
                                        <IonLabel position="floating">Banca</IonLabel>
                                        <IonInput placeholder="Inserisci nome banca..." onIonChange={(e) => storeName(e.detail.value)}></IonInput>
                                    </IonItem>
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

export default Bank