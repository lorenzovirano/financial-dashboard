import { IonSplitPane, IonMenu, useIonRouter, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonItem, IonPage, IonIcon, IonButton } from '@ionic/react'
import { homeOutline, logOutOutline, downloadOutline, peopleOutline, cogOutline, createOutline } from 'ionicons/icons'
import { Route, Redirect } from 'react-router-dom';
import Dashboard from '../../pages/dashboard/Dashboard'
import Import from '../../pages/import/Import';
import Register from '../../pages/register/Register';
import Family from '../../pages/family/Family';
import './Menu.css'
import Settings from '../../pages/settings/Settings';
import Payments from '../../pages/payments/Payments';

const Menu: React.FC = () => {
    const navigation = useIonRouter();
    const paths = [
        { name: 'Dashboard', url: '/app/dashboard', icon: homeOutline },
        { name: 'Import Data', url: '/app/import', icon: downloadOutline },
        { name: 'Family', url: '/app/family', icon: peopleOutline },
        { name: 'Payments', url: '/app/payments', icon: createOutline },
        { name: 'Settings', url: '/app/settings', icon: cogOutline }
    ]
    const doLogout = async () => {
        localStorage.setItem("jwt", "null")
        navigation.push('/', 'root', 'replace');
    }
    return (
        <IonPage>
            <IonSplitPane contentId='main'>
                <IonMenu contentId='main'>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        {paths.map((item, index) => (
                            <IonMenuToggle key={index}>
                                <IonItem routerLink={item.url} routerDirection='none'>
                                    <IonIcon icon={item.icon} slot='start' />
                                    {item.name}
                                </IonItem>
                            </IonMenuToggle>
                        ))}
                        <IonButton onClick={doLogout} expand='full'>
                            <IonIcon icon={logOutOutline} slot='start'></IonIcon>
                            Logout
                        </IonButton>
                    </IonContent>
                </IonMenu>
                <IonRouterOutlet id='main'>
                    <Route exact path="/app/dashboard" component={Dashboard} />
                    <Route exact path="/app/import" component={Import} />
                    <Route exact path="/app/signup" component={Register} />
                    <Route exact path="/app/family" component={Family} />
                    <Route exact path="/app/payments" component={Payments} />
                    <Route exact path="/app/settings" component={Settings} />
                    <Route exact path="/app" component={Dashboard}>
                        <Redirect to="/app/dashboard" />
                    </Route>
                </IonRouterOutlet>
            </IonSplitPane>
        </IonPage>
    )
}

export default Menu