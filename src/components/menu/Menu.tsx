import { IonSplitPane, IonMenu, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonItem, IonPage, IonIcon, IonButton } from '@ionic/react'
import { homeOutline, logOutOutline, downloadOutline } from 'ionicons/icons'
import { Route, Redirect } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard'
import './Menu.css'

const Menu: React.FC = () => {
    const paths = [
        {name: 'Dashboard', url: '/app/dashboard', icon: homeOutline},
        {name: 'Import Data', url: '/app/import', icon: downloadOutline}
    ]

    return(
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
                        <IonButton routerLink='/' routerDirection='forward' expand='full'>
                            <IonIcon icon={logOutOutline} slot='start'></IonIcon>
                            Logout
                        </IonButton>
                    </IonContent>
                </IonMenu>
                <IonRouterOutlet id='main'>
                    <Route exact path="/app/dashboard" component={Dashboard}/>
                    <Route exact path="/app/import" component={Dashboard}/>
                    <Route exact path="/app" component={Dashboard}>
                        <Redirect to="/app/dashboard" />
                    </Route>
                </IonRouterOutlet>
            </IonSplitPane>
        </IonPage>
    )
}

export default Menu