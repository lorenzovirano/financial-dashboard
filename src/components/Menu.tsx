import { IonSplitPane, IonMenu, IonRouterOutlet, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react'
import './Menu.css'

const Menu: React.FC = () => {
    const paths = [
        {name: 'Dashboard', url: 'pages/dashboard', icon: 'homeOutline'}
    ]

    return(
        <IonSplitPane contentId='main'>
            <IonMenu contentId='main'>
            </IonMenu>

            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonRouterOutlet id='main'> 
            </IonRouterOutlet>
        </IonSplitPane>
    )
}

export default Menu