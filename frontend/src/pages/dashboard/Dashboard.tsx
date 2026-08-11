import './Dashboard.css';
import { IonCol, IonGrid, IonRow, IonHeader, IonTitle, useIonRouter, IonToolbar, IonPage, IonButtons, IonMenuButton, IonContent, IonFab, IonFabButton, IonIcon, IonButton, IonList, IonItem, IonSelect, IonSelectOption, IonModal, IonInput, IonDatetime, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { add, closeOutline } from 'ionicons/icons'
import Layout from '../../components/layout/Layout';
import TotalBalance from '../../components/widget/totalBalance/TotalBalance';
import Table from '../../components/widget/table/Table';
import CreditCards from '../../components/widget/creditCards/CreditCards';
import TableItem from '../../components/widget/table/TableItem';
import Charts from '../../components/charts/Charts';
import { Key, useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
    interface Type {
        name?: String,
        id?: string,
        _id?: Key
    }
    interface Category {
        name?: String,
        id?: string,
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
        bankName?: string,
        user?: string
        _id?: number
    }

    const [username, setUsername] = useState("");
    const [wallet, setWallet] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    
    const [isExpense, setIsExpense] = useState<boolean>(true);
    const [types, setTypes] = useState<Type[]>();
    const [cat, setCat] = useState<Category[]>();
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [value, setValue] = useState<any>("");
    const [title, setTitle] = useState("");
    
    const [incomeTypeId, setIncomeTypeId] = useState<string>("");
    const [expenseTypeId, setExpenseTypeId] = useState<string>("");

    const [revenues, setRevenues] = useState<any>("");
    const [transactions, setTransaction] = useState<Transaction[]>();
    const [bank, setBank] = useState<Bank[]>();

    const navigation = useIonRouter();

    const submitTransaction = async () => {
        let jwt = localStorage.getItem("jwt")
        if (jwt === "null" || !jwt) {
            navigation.push('/', 'root', 'replace');
            return;
        }

        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', jwt);

        let finalValue = Number(value);
        if (isExpense && finalValue > 0) {
            finalValue = finalValue * -1;
        } else if (!isExpense && finalValue < 0) {
            finalValue = Math.abs(finalValue);
        }

        let payload = {
            "description": title,
            "type": type,
            "date": date,
            "category": category,
            "cash": finalValue
        }
        
        try {
            await fetch('http://localhost:8080/transaction/create', {
                method: "POST",
                headers: headers,
                body: JSON.stringify(payload)
            });
            setIsOpenModal(false);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    const fetchCategoriesForType = async (typeId: string, customHeaders?: Headers) => {
        let jwt = localStorage.getItem("jwt");
        let headers = customHeaders || new Headers({ 'Content-type': 'application/json', 'Authorization': jwt || "" });

        setType(typeId);
        setCategory("");

        try {
            const response = await fetch(`http://localhost:8080/categories/${typeId}`, {
                method: 'GET',
                headers: headers,
            });
            const res = await response.json();
            setCat(res.data);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const handleSegmentChange = (value: string) => {
        const isOut = value === "out";
        setIsExpense(isOut);
        
        const targetTypeId = isOut ? expenseTypeId : incomeTypeId;
        if (targetTypeId) {
            fetchCategoriesForType(targetTypeId);
        }
    };

    const getCurrentDate = () => {
        const date = new Date();
        return date.toJSON();
    }

    useEffect(() => {
        const checkHeaders = async () => {
            let jwt = localStorage.getItem("jwt")
            if (jwt === "null" || !jwt) {
                navigation.push('/', 'root', 'replace');
                return;
            }
            let headers = new Headers();
            headers.append('Content-type', 'application/json');
            headers.append('Authorization', jwt);
            
            await getUser(headers);
            await getTypes(headers);
            getTransactions(headers, 'all');
            getBank(headers);
        }

        const getBank = async (headers: any) => {
            try {
                const response = await fetch('http://localhost:8080/bank/', { method: 'GET', headers });
                const res = await response.json();
                setBank(res.data);
            } catch (err: any) { console.log(err.message); }
        }

        const getUser = async (headers: any) => {
            try {
                const response = await fetch('http://localhost:8080/users/profile', { method: 'GET', headers });
                const res = await response.json();
                
                console.log("Dati arrivati dal server:", res);
                
                setUsername(res.user?.username || '');
                setWallet(res.wallet || '0');

                setRevenues({
                    resultLabel: res.revenues?.resultLabel || [],
                    resultCash: res.revenues?.resultCash || [],
                    total: res.revenues?.total || 0,
                    incomeTrend: res.incomeTrend || { labels: [], data: [] }
                });
            } catch (err: any) { console.log(err.message); }
        }

        const getTypes = async (headers: any) => {
            try {
                const response = await fetch('http://localhost:8080/categories/types', { method: 'GET', headers });
                const res = await response.json();
                setTypes(res.data);
                
                const inc = res.data.find((t: any) => t.name.toLowerCase() === 'entrata');
                const exp = res.data.find((t: any) => t.name.toLowerCase() === 'uscita');
                
                const incId = inc ? (inc.id || inc._id) : "";
                const expId = exp ? (exp.id || exp._id) : "";

                setIncomeTypeId(incId);
                setExpenseTypeId(expId);

                // Di default carichiamo le categorie delle uscite (visto che partiamo su Uscita)
                if (expId) {
                    fetchCategoriesForType(expId, headers);
                }
            } catch (err: any) { console.log(err.message); }
        }

        checkHeaders();
    }, [])

    const getHeader = () => {
        let jwt = localStorage.getItem("jwt")
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', jwt || "");
        return headers;
    }

    async function getTransactions(headers: any, val: string){
        let res: Response;
        try {
            switch(val){
                case 'all':
                    res = await fetch('http://localhost:8080/transaction/show?limit=4', { method: 'GET', headers });
                    break;
                case 'pos':
                    res = await fetch('http://localhost:8080/transaction/show-positive?limit=4', { method: 'GET', headers });
                    break;
                case 'neg':
                    res = await fetch('http://localhost:8080/transaction/show-negative?limit=4', { method: 'GET', headers });
                    break;
                default:
                    return;
            }
            let json = await res.json();
            setTransaction(json.data);
        } catch (error: any) {
            console.error(error.message);
        }
    }

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
                                <CreditCards username={username} banks={bank} />
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
                                            <IonSelect interface='popover' placeholder='Tutti i movimenti'
                                            onIonChange={(e) => getTransactions(getHeader(), e.detail.value)}
                                            >
                                                <IonSelectOption value="all">Tutti i movimenti</IonSelectOption> 
                                                <IonSelectOption value="pos">Entrate</IonSelectOption>
                                                <IonSelectOption value="neg">Uscite</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonList>
                                </IonCol>
                                <IonCol size='12'>
                                    <Table>
                                        {transactions?.map((transaction) =>
                                            <TableItem key={transaction._id} title={transaction.description} value={transaction.cash} recipient={transaction.date} outflow={transaction.cash < 0} currency='$' />
                                        )}
                                        <IonButton expand='block' slot='end'>Visualizza tutti i movimenti</IonButton>
                                    </Table>
                                </IonCol>
                                <IonCol>
                                    <Charts data={revenues} />
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </Layout>
                </section>

                <IonFab slot="fixed" horizontal="end" vertical="bottom">
                    <IonFabButton onClick={() => setIsOpenModal(true)}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>

                {/* Modale Unificata Movimento */}
                <IonModal isOpen={isOpenModal} onDidDismiss={() => setIsOpenModal(false)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Nuovo Movimento</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setIsOpenModal(false)}><IonIcon icon={closeOutline} /></IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <Layout>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size='12'>
                                        <IonList>
                                            <IonSegment value={isExpense ? "out" : "in"} onIonChange={e => handleSegmentChange(e.detail.value as string)} style={{ marginBottom: '15px' }}>
                                                <IonSegmentButton value="out">
                                                    <IonLabel>Uscita</IonLabel>
                                                </IonSegmentButton>
                                                <IonSegmentButton value="in">
                                                    <IonLabel>Entrata</IonLabel>
                                                </IonSegmentButton>
                                            </IonSegment>

                                            <IonInput fill="outline" className='ion-no-padding' label="Titolo" labelPlacement="floating" onIonInput={(e) => setTitle(e.detail.value!)} placeholder="Es. Spesa, Stipendio..." />
                                            <IonInput fill="outline" className='ion-no-padding' label="Valore" labelPlacement="floating" onIonInput={(e) => setValue(e.detail.value!)} placeholder="0.00" type='number' />
                                            
                                            <div className="container-input" style={{ margin: '15px 0' }}>
                                                <IonSelect placeholder="Seleziona categoria"
                                                    onIonChange={(e) => setCategory(e.detail.value)}
                                                    className='ion-padding' fill="outline" disabled={!cat || cat.length === 0}>
                                                    {cat?.map((c) =>
                                                        <IonSelectOption key={c.id || c._id} value={c.id || c._id}>{c.name}</IonSelectOption>
                                                    )}
                                                </IonSelect>
                                            </div>

                                            <IonDatetime onIonChange={(e) => setDate(e.detail.value as string)} locale='it-IT' className='custom-datatime' max={`${getCurrentDate()}`} />
                                            
                                            <IonButton expand="block" style={{ marginTop: '20px' }} onClick={submitTransaction} disabled={!date || !category || !type || !title || !value}>
                                                Crea transazione
                                            </IonButton>
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