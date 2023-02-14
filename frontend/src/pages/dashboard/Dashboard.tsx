import './Dashboard.css';
import { IonCol, IonGrid, IonRow, IonHeader, IonTitle, useIonRouter, IonToolbar, IonPage, IonButtons, IonMenuButton, IonContent, IonFab, IonFabButton, IonIcon, IonFabList, IonButton, IonList, IonItem, IonSelect, IonSelectOption, IonModal, IonLabel, IonInput, IonDatetime } from '@ionic/react';
import { add, closeOutline, removeOutline, addOutline } from 'ionicons/icons'
import Layout from '../../components/layout/Layout';
import TotalBalance from '../../components/widget/totalBalance/TotalBalance';
import Table from '../../components/widget/table/Table';
import CreditCards from '../../components/widget/creditCards/CreditCards';
import TableItem from '../../components/widget/table/TableItem';
import Charts from '../../components/charts/Charts';
import { Key, useEffect, useState } from 'react';
import { CategoryScale } from 'chart.js';

const Dashboard: React.FC = () => {

    interface Type {
        name?: String,
        _id?: Key
    }
    interface Category {
        name?: String,
        _id?: Key
    }
    interface Transaction {
        description: string,
        cash: number,
        date: string,
        type: String,
        category: String,
        _id: number
    }
    interface Bank {
        bankName: string,
        user: number
        _id: number
    }
    const [username, setUsername] = useState("");
    const [wallet, setWallet] = useState("");
    const [types, setTypes] = useState<Type[]>();
    const [isOpenIn, setIsOpenIn] = useState(false);
    const [isOpenOut, setIsOpenOut] = useState(false);
    const [cat, setCat] = useState<Category[]>();
    const [category, setCategory] = useState("")
    const [type, setType] = useState("")
    const [date, setDate] = useState("")
    let [value, setValue] = useState<Number>()
    const [title, setTitle] = useState("")
    const [revenues, setRevenues] = useState("")
    const [transactions, setTransaction] = useState<Transaction[]>()
    const [bank, setBank] = useState<Bank>();
    const submitTransaction = async (negative: boolean) => {
        let jwt = localStorage.getItem("jwt")
        if (jwt === "null" || jwt === undefined) {
            navigation.push('/', 'root', 'replace');
        }
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', jwt || "no");
        console.log(negative)
        if (negative === true && value !== undefined) {
            value = +value * -1
        }
        let payload = {
            "description": title,
            "type": type,
            "date": date,
            "category": category,
            "cash": value
        }
        await fetch('http://localhost:4000/transaction/create', {
            "method": "POST",
            "headers": headers,
            "body": JSON.stringify(payload)
        })
            .then((response) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const pushType = async (idType: string) => {
        let jwt = localStorage.getItem("jwt")
        if (jwt === "null" || jwt === undefined) {
            navigation.push('/', 'root', 'replace');
        }
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', jwt || "no");
        await fetch('http://localhost:4000/transaction/categories?id=' + idType, {
            "method": 'GET',
            "headers": headers,
        })
            .then((response) => {
                console.log(response);
                let cat = response.json()
                    .then((res) => {
                        setType(idType)
                        setCat(res.data)
                    })
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const storeDate = async (dateSelected: any) => {
        setDate(dateSelected)
    }
    const pushCat = async (catSelected: any) => {
        setCategory(catSelected)
    }
    const pushValue = async (valueSelected: any) => {
        setValue(valueSelected)
    }
    const pushTitle = async (titleSelected: any) => {
        setTitle(titleSelected)
    }
    const getCurrentDate = () => {
        const date = new Date();

        let currentJSON = date.toJSON();

        return currentJSON;
    }

    const navigation = useIonRouter();
    useEffect(() => {
        const checkHeaders = async () => {
            let jwt = localStorage.getItem("jwt")
            if (jwt === "null" || jwt === undefined) {
                navigation.push('/', 'root', 'replace');
            }
            let headers = new Headers();
            headers.append('Content-type', 'application/json');
            headers.append('Authorization', jwt || "no");
            getUser(headers)
            getTypes(headers)
            getTransactions(headers)
            getBank(headers)
        }

        const getBank = async (headers: any) => {
            await fetch('http://localhost:4000/bank/get-bank', {
                "method": 'GET',
                "headers": headers,
            })
                .then((response) => {
                    console.log(response);
                    let bankRes = response.json()
                        .then((res) => {
                            setBank(res.data)
                            // console.log(bank)
                        })
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }

        const getUser = async (headers: any) => {
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
                            setRevenues(res.revenues)
                            console.log(revenues)
                        })
                })
                .catch((err) => {
                    console.log(err.message);
                });
            //

        }
        const getTypes = async (headers: any) => {
            await fetch('http://localhost:4000/transaction/types', {
                "method": 'GET',
                "headers": headers,
            })
                .then((response) => {
                    console.log(response);
                    let type = response.json()
                        .then((res) => {
                            setTypes(res.data)
                            console.log(types)
                        })
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }

        const getTransactions = async (headers: any) => {
            await fetch('http://localhost:4000/transaction/show?limit=4', {
                "method": 'GET',
                "headers": headers,
            })
                .then((response) => {
                    console.log(response);
                    response.json()
                        .then((res) => {
                            setTransaction(res.data)
                            console.log(transactions)
                        })
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
        checkHeaders();
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
                                <CreditCards username={username} bankName={bank}/>
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
                                        {transactions?.map((transaction) =>
                                            <TableItem title={transaction.description} value={transaction.cash} recipient={transaction.date} outflow={transaction.cash < 0} currency='$' />
                                        )}
                                        <IonButton expand='block' slot='end'>Visualizza tutti i movimenti</IonButton>
                                    </Table>
                                </IonCol>
                                <IonCol>
                                    <Charts data={revenues} />
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
                            <IonIcon icon={addOutline} />
                        </IonFabButton>
                        <IonFabButton onClick={() => setIsOpenOut(true)}>
                            <IonIcon icon={removeOutline} />
                        </IonFabButton>
                    </IonFabList>
                </IonFab>
                {/*TODO:  Inserire i modali in componenti figli e gestire lo stato, probabilmente sarà necessario utilizzare Redux*/}
                <IonModal isOpen={isOpenIn}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Entrata</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setIsOpenIn(false)}><IonIcon icon={closeOutline} /></IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <Layout>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size='12'>
                                        <IonList>
                                            <IonItem fill="outline" className='ion-no-padding'>
                                                <IonLabel position="floating">Titolo</IonLabel>
                                                <IonInput onIonInput={(e) => pushTitle(e.target.value)} placeholder="Inserisci titolo quì..."></IonInput>
                                            </IonItem>
                                            <IonItem fill="outline" className='ion-no-padding'>
                                                <IonLabel position="floating">Valore</IonLabel>
                                                <IonInput onIonInput={(e) => pushValue(e.target.value)} placeholder="Inserisci valore quì..." type='number'></IonInput>
                                            </IonItem>
                                            <div className="container-input">
                                                <IonSelect placeholder="Seleziona categoria"
                                                    onIonChange={(e) => pushType(e.target.value)}
                                                    className="ion-padding">
                                                    {types?.map((type) =>
                                                        <IonSelectOption key={type._id} value={type._id}>
                                                            {type.name}
                                                        </IonSelectOption>
                                                    )}
                                                </IonSelect>
                                                <IonSelect onIonChange={(e) => pushCat(e.detail.value)} placeholder={`Sottocategoria`} className='ion-padding'>
                                                    {cat?.map((category) =>
                                                        <IonSelectOption key={category._id} value={category._id}>{category.name}</IonSelectOption>
                                                    )}
                                                </IonSelect>
                                            </div>
                                            <IonDatetime onIonChange={(e) => storeDate(e.detail.value)} locale='it-IT' className='custom-datatime' max={`${getCurrentDate()}`} />
                                            <IonButton onClick={(e) => submitTransaction(false)} disabled={date === "" || category === null || type === null || title === "" || value === 0}>Crea transazione</IonButton>
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
                                <IonButton onClick={() => setIsOpenOut(false)}><IonIcon icon={closeOutline} /></IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <Layout>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size='12'>
                                        <IonList>
                                            <IonItem fill="outline" className='ion-no-padding'>
                                                <IonLabel position="floating">Titolo</IonLabel>
                                                <IonInput onIonInput={(e) => pushTitle(e.target.value)} placeholder="Inserisci titolo quì..."></IonInput>
                                            </IonItem>
                                            <IonItem fill="outline" className='ion-no-padding'>
                                                <IonLabel position="floating">Valore</IonLabel>
                                                <IonInput onIonInput={(e) => pushValue(e.target.value)} placeholder="Inserisci valore quì..." type='number'></IonInput>
                                            </IonItem>
                                            <div className="container-select">
                                                <IonSelect placeholder="Seleziona categoria"
                                                    onIonChange={(e) => pushType(e.detail.value)}
                                                    className="ion-padding">
                                                    {types?.map((type) =>
                                                        <IonSelectOption key={type._id} value={type._id}>
                                                            {type.name}
                                                        </IonSelectOption>
                                                    )}
                                                </IonSelect>
                                                <IonSelect onIonChange={(e) => pushCat(e.detail.value)} placeholder={`Sottocategoria`} className='ion-padding'>
                                                    {cat?.map((category) =>
                                                        <IonSelectOption key={category._id} value={category._id}>{category.name}</IonSelectOption>
                                                    )}
                                                </IonSelect>
                                            </div>
                                            <IonDatetime onIonChange={(e) => storeDate(e.detail.value)} locale='it-IT' className='custom-datatime' max={`${getCurrentDate()}`} />
                                            <IonButton onClick={(e) => submitTransaction(true)} disabled={date === "" || category === null || type === null || title === "" || value === 0}>Crea transazione</IonButton>
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