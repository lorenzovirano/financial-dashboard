import React, { useState } from 'react';
import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonNote, IonButton  } from '@ionic/react';
import Layout from '../../components/layout/Layout';
import './Register.css';

const Register: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sign Up</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Layout>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='12'>
                                <form action="#">
                                    <IonItem fill="solid">
                                        <IonLabel position="floating">Nome</IonLabel>
                                        <IonInput type="text"></IonInput>
                                    </IonItem>
                                    <IonItem fill="solid">
                                        <IonLabel position="floating">Cognome</IonLabel>
                                        <IonInput type="text"></IonInput>
                                    </IonItem>
                                    <IonItem fill="solid">
                                        <IonLabel position="floating">Email</IonLabel>
                                        <IonInput type="email"></IonInput>
                                    </IonItem>
                                    <IonItem fill="solid">
                                        <IonLabel position="floating">Password</IonLabel>
                                        <IonInput type="password"></IonInput>
                                    </IonItem>
                                    <IonItem fill="solid">
                                        <IonLabel position="floating">Ripeti Password</IonLabel>
                                        <IonInput type="password"></IonInput>
                                    </IonItem>
                                    <IonButton type='submit'>
                                        Registrati
                                    </IonButton>
                                </form>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </Layout>
            </IonContent>
        </IonPage>
    )
}

export default Register;