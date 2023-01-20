import './Dashboard.css';
import { IonCol, IonGrid, IonRow, IonHeader, IonTitle, IonToolbar, IonPage, IonButtons, IonMenuButton, IonContent, IonFab, IonFabButton, IonIcon, IonFabList, IonButton, IonList, IonItem, IonSelect, IonSelectOption} from '@ionic/react';
import { add } from 'ionicons/icons'
import Layout from '../../components/layout/Layout';
import TotalBalance from '../../components/widget/totalBalance/TotalBalance';
import Table from '../../components/widget/table/Table';
import CreditCards from '../../components/widget/creditCards/CreditCards';
import TableItem from '../../components/widget/table/TableItem';
import DoughnutChart from '../../components/charts/doughnutChart/DoughnutChart';


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
            <IonContent scrollY={true}>
                <Layout>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='12'>
                                <CreditCards />
                                <TotalBalance currency='$' total={6500.00}/>
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
                                        <TableItem title='Pagamento pos' value={36.50} recipient="McDonald's" outflow={true} currency='$'/>
                                        <TableItem title='Pagamento pos' value={36.50} recipient="McDonald's" outflow={false} currency='$'/>
                                        <TableItem title='Pagamento pos' value={36.35} recipient="McDonald's" outflow={false} currency='$'/>
                                        <TableItem title='Pagamento pos' value={36.25} recipient="McDonald's" outflow={true} currency='$'/>
                                        <IonButton expand='block' slot='end'>Visualizza tutti i movimenti</IonButton>
                                    </Table>
                                </IonCol>
                                <IonCol>
                                    <DoughnutChart title='Uscite' total={350}/>
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