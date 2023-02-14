import "./CreditCards.css"
import { useState, useEffect } from "react"
import { IonSlides, IonSlide, IonIcon, IonButton } from "@ionic/react"
import { addCircleOutline } from "ionicons/icons"


type CreditCardsProps = {
    username: string,
    banks?: any
}

const CreditCards = ({ username, banks }: CreditCardsProps) => {
    console.log(banks)
    return (
        <IonSlides pager={true} mode="ios">

            <IonSlide>
                <div className="credit-card credit-card--add">
                    <span className="credit-card__number">
                        Aggiungi un conto bancario
                    </span>
                    <IonButton routerLink="/app/insert-bank" className="btn--transparent">
                        <IonIcon icon={addCircleOutline} />
                    </IonButton>
                </div>
            </IonSlide>

            {banks?.map((bank: any) =>
                <IonSlide>
                    <div className="credit-card">
                        <div className="credit-card__up">
                            <span className="credit-card__type">
                                Credit
                            </span>
                            <span className="credit-card__bank">
                                {bank?.bankName}
                            </span>
                        </div>
                        <div className="credit-card__down">
                            <span className="credit-card__number">
                                XXXX XXXX XXXX XXXX
                            </span>
                            <span className="credit-card__user-name">
                                {username}
                            </span>
                        </div>
                    </div>
                </IonSlide>
            )}

        </IonSlides>

    )
}

export default CreditCards