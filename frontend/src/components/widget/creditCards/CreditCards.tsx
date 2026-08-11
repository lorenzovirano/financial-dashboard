import "./CreditCards.css"
import { useState, useEffect } from "react"
import { IonIcon, IonButton } from "@ionic/react"
import { addCircleOutline } from "ionicons/icons"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCards } from 'swiper';


type CreditCardsProps = {
    username: string,
    banks?: any
}

const CreditCards = ({ username, banks }: CreditCardsProps) => {
    console.log(banks)
    return (
        <Swiper
        spaceBetween={25}
        slidesPerView={1}
        modules={[ Pagination, EffectCards ]}
        pagination={{ clickable: true }}
        effect="cards"
        >
            {banks?.map((bank: any) =>
                <SwiperSlide>
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
                </SwiperSlide>
            )} 
                <SwiperSlide>
                    <div className="credit-card credit-card--add">
                        <span className="credit-card__number">
                            Aggiungi un conto bancario
                        </span>
                        <IonButton routerLink="/app/insert-bank" className="btn--transparent">
                            <IonIcon icon={addCircleOutline} />
                        </IonButton>
                    </div>
                </SwiperSlide>
        </Swiper>
    )
}

export default CreditCards