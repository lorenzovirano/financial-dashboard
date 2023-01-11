import { IonSplitPane, IonMenu, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonItem, IonPage, IonIcon } from '@ionic/react'
import { homeOutline } from 'ionicons/icons'
import { Route, Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard'
import './Menu.css'

const Menu: React.FC = () => {
    const paths = [
        {name: 'Dashboard', url: '/app/dashboard', icon: homeOutline}
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
                    </IonContent>
                </IonMenu>
                <IonRouterOutlet id='main'>
                    <Route exact path="/app/dashboard" component={Dashboard}/>
                    <Route exact path="/app" component={Dashboard}>
                        <Redirect to="/app/dashboard" />
                    </Route>
                </IonRouterOutlet>
            </IonSplitPane>
        </IonPage>
    )
}

export default Menu