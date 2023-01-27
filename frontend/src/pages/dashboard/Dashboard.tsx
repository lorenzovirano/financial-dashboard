import './Dashboard.css';
import { IonCol, IonGrid, IonRow, IonHeader, IonTitle, useIonRouter, IonToolbar, IonPage, IonButtons, IonMenuButton, IonContent, IonFab, IonFabButton, IonIcon, IonFabList, IonButton, IonList, IonItem, IonSelect, IonSelectOption, IonModal, IonLabel, IonInput } from '@ionic/react';
import { add, closeOutline, removeOutline, addOutline } from 'ionicons/icons'
import Layout from '../../components/layout/Layout';
import TotalBalance from '../../components/widget/totalBalance/TotalBalance';
import Table from '../../components/widget/table/Table';
import CreditCards from '../../components/widget/creditCards/CreditCards';
import TableItem from '../../components/widget/table/TableItem';
import Charts from '../../components/charts/Charts';
import { useEffect, useState } from 'react';




const Dashboard: React.FC = () => {
    const [username, setUsername] = useState("");
    const [wallet, setWallet] = useState("");
    const [isOpenIn, setIsOpenIn] = useState(false);
    const [isOpenOut, setIsOpenOut] = useState(false);
    const [cat, setCat] = useState<string>();
    const pushCat = (catMsg: string) => {
        setCat(catMsg);
    }
    const navigation = useIonRouter();
    useEffect(() => {
        const getUser = async () => {

            let jwt = localStorage.getItem("jwt")
            if (jwt === "null" || jwt === undefined) {
                navigation.push('/', 'root', 'replace');
            }
            let headers = new Headers();
            headers.append('Content-type', 'application/json');
            headers.append('Authorization', jwt || "no");
            await fetch('http://localhost:4000/users/user-profile', {
                "method": 'GET',
                "headers": headers,
            })
                .then((response) => {
                    console.log(response);
                    let user = response.json()
                        .then((res) => {
                            setUsername(res.user.username)
                            setWallet(res.wallet)
                        })
                })
                .catch((err) => {
                    console.log(err.message);
                });
            //

        }

        getUser();

    }, [])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Financial - {username}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={true}>
                <Layout>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='12'>
                                <CreditCards />
                                <TotalBalance currency='$' total={wallet} />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </Layout>
                <section className='movement-section'>
                    <Layout>
                        <IonGrid>
                            <IonRow>
                                <IonCol size='12'>
                                    <IonList>
                                        <IonItem>
                                            <IonSelect interface='popover' placeholder='Tutti i movimenti'>
                                                <IonSelectOption value="Tutti i movimenti">Tutti i movimenti</IonSelectOption>
                                                <IonSelectOption value="Entrate">Entrate</IonSelectOption>
                                                <IonSelectOption value="Uscite">Uscite</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonList>
                                </IonCol>
                                <IonCol size='12'>
                                    <Table>
                                        <TableItem title='Pagamento pos' value={36.50} recipient="McDonald's" outflow={true} currency='$' />
                                        <TableItem title='Pagamento pos' value={36.50} recipient="McDonald's" outflow={false} currency='$' />
                                        <TableItem title='Pagamento pos' value={36.35} recipient="McDonald's" outflow={false} currency='$' />
                                        <TableItem title='Pagamento pos' value={36.25} recipient="McDonald's" outflow={true} currency='$' />
                                        <IonButton expand='block' slot='end'>Visualizza tutti i movimenti</IonButton>
                                    </Table>
                                </IonCol>
                                <IonCol>
                                    <Charts />
                                </IonCol>
                                <IonCol size='12'>
                                    <Table>
                                        <h3 className='section-title'>Spese programmate</h3>
                                        <TableItem title='Pagamento pos' value={36.50} recipient="McDonald's" outflow={true} currency='$' />
                                        <TableItem title='Pagamento pos' value={36.50} recipient="McDonald's" outflow={true} currency='$' />
                                        <TableItem title='Pagamento pos' value={36.35} recipient="McDonald's" outflow={true} currency='$' />
                                        <TableItem title='Pagamento pos' value={36.25} recipient="McDonald's" outflow={true} currency='$' />
                                        <IonButton expand='block' slot='end'>Visualizza spsese programmate</IonButton>
                                    </Table>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </Layout>
                </section>
                <IonFab slot="fixed" horizontal="end" vertical="bottom">
                    <IonFabButton>
                        <IonIcon icon={add} />
                    </IonFabButton>
                    <IonFabList side='top'>
                        <IonFabButton onClick={() => setIsOpenIn(true)}>
                            <IonIcon icon={addOutline}/>
                        </IonFabButton>
                        <IonFabButton onClick={() => setIsOpenOut(true)}>
                            <IonIcon icon={removeOutline}/>
                        </IonFabButton>
                    </IonFabList>
                </IonFab>
                {/*TODO:  Inserire i modali in componenti figli e gestire lo stato, probabilmente sarà necessario utilizzare Redux*/}
                <IonModal isOpen={isOpenIn}>
                    <IonHeader>
                        <IonToolbar>
                        <IonTitle>Entrata</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setIsOpenIn(false)}><IonIcon icon={closeOutline}/></IonButton>
                        </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <Layout>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size='12'>
                                        <IonList>
                                            <IonItem fill="outline">
                                                <IonLabel position="floating">Titolo</IonLabel>
                                                <IonInput placeholder="Inserisci titolo quì..."></IonInput>
                                            </IonItem>
                                            <IonItem fill="outline">
                                                <IonLabel position="floating">Valore</IonLabel>
                                                <IonInput placeholder="Inserisci valore quì..." type='number'></IonInput>
                                            </IonItem>
                                            <IonSelect placeholder="Seleziona categoria" 
                                            onIonChange={(e) => pushCat(`Sottocategorie di ${e.detail.value}`)} 
                                            className="ion-padding">
                                                <IonSelectOption value="shopping">Shopping</IonSelectOption>
                                                <IonSelectOption value="food">Food</IonSelectOption>
                                            </IonSelect>
                                            <IonSelect placeholder={`Sottocategoria`}>
                                                <IonSelectOption value={`${cat}sub`}>{cat}</IonSelectOption>
                                            </IonSelect>
                                        </IonList>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </Layout>
                    </IonContent>
                </IonModal>
                <IonModal isOpen={isOpenOut}>
                    <IonHeader>
                        <IonToolbar>
                        <IonTitle>Uscita</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setIsOpenOut(false)}><IonIcon icon={closeOutline}/></IonButton>
                        </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <Layout>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size='12'>
                                        <IonList>
                                            <IonItem fill="outline">
                                                <IonLabel position="floating">Titolo</IonLabel>
                                                <IonInput placeholder="Inserisci titolo quì..."></IonInput>
                                            </IonItem>
                                            <IonItem fill="outline">
                                                <IonLabel position="floating">Valore</IonLabel>
                                                <IonInput placeholder="Inserisci valore quì..." type='number'></IonInput>
                                            </IonItem>
                                            <IonSelect placeholder="Seleziona categoria" 
                                            onIonChange={(e) => pushCat(`Sottocategorie di ${e.detail.value}`)} 
                                            className="ion-padding">
                                                <IonSelectOption value="shopping">Shopping</IonSelectOption>
                                                <IonSelectOption value="food">Food</IonSelectOption>
                                            </IonSelect>
                                            <IonSelect placeholder={`Sottocategoria`}>
                                                <IonSelectOption value={`${cat}sub`}>{cat}</IonSelectOption>
                                            </IonSelect>
                                        </IonList>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </Layout>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
}

export default Dashboard; 