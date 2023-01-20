import './ImportCards.css'
import { folderOutline } from 'ionicons/icons'
import { IonIcon } from '@ionic/react'


const ImportCards: React.FC = () => {
    return (
        <div className="import-cards">
            <IonIcon icon={folderOutline}></IonIcon>
            <div className="import-cards__details">
                <span className='import-cards__name'>Intesa Sanpaolo</span>
                <span className='import-cards__date'>24/10/2023</span>
            </div>
        </div>
    )
}

export default ImportCards;