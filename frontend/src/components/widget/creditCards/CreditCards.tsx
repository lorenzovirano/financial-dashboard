import "./CreditCards.css"
import { IonSlides, IonSlide, IonIcon} from "@ionic/react"
import { addCircleOutline } from "ionicons/icons"

const CreditCards: React.FC = () => {
    return (
        <IonSlides pager={true} mode="ios">
            <IonSlide>
                <div className="credit-card">
                    <div className="credit-card__up">
                        <span className="credit-card__type">
                            Credit
                        </span>
                        <span className="credit-card__bank">
                            YOUR BANK
                        </span>
                    </div>
                    <div className="credit-card__down">
                        <span className="credit-card__number">
                            XXXX XXXX XXXX XXXX
                        </span>
                        <span className="credit-card__user-name">
                            Name Surname
                        </span>
                    </div>
                </div>
            </IonSlide>
            <IonSlide>
                <div className="credit-card">
                    <div className="credit-card__up">
                        <span className="credit-card__type">
                            Credit
                        </span>
                        <span className="credit-card__bank">
                            YOUR BANK
                        </span>
                    </div>
                    <div className="credit-card__down">
                        <span className="credit-card__number">
                            XXXX XXXX XXXX XXXX
                        </span>
                        <span className="credit-card__user-name">
                            Name Surname
                        </span>
                    </div>
                </div>
            </IonSlide>
            <IonSlide>
                <div className="credit-card credit-card--add">
                    <span className="credit-card__number">
                        Aggiungi un conto bancario
                    </span>
                    <IonIcon icon={addCircleOutline}/>
                </div>
            </IonSlide>
        </IonSlides>
    
    )
}

export default CreditCards