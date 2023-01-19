import React, { useState } from 'react';
import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonNote  } from '@ionic/react';
import Layout from '../../components/layout/Layout';
import './Register.css';

const Register: React.FC = () => {
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();
  
    const validateEmail = (email: string) => {
      return email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      );
    };

    /* const validatePassword = (pwd: string) => {
        return pwd.match(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        );
    };*/
  
    const validate = (ev: Event) => {
      const valueEmail = (ev.target as HTMLInputElement).value;

      setIsValid(undefined);
  
      if (valueEmail === '') return;
  
      validateEmail(valueEmail) !== null ? setIsValid(true) : setIsValid(false);

    };
  
    const markTouched = () => {
      setIsTouched(true);
    };

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
                                    <IonItem fill="solid" className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}>
                                        <IonLabel position="floating">Email</IonLabel>
                                        <IonInput type="email" onIonInput={(event) => validate(event)} onIonBlur={() => markTouched()}></IonInput>
                                        <IonNote slot="helper">Enter a valid email</IonNote>
                                        <IonNote slot="error">Invalid email</IonNote>
                                    </IonItem>
                                    <IonItem fill="solid" className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}>
                                        <IonLabel position="floating">Password</IonLabel>
                                        <IonInput type="password" onIonInput={(event) => validate(event)} onIonBlur={() => markTouched()}></IonInput>
                                        <IonNote slot="helper">Enter a valid password</IonNote>
                                        <IonNote slot="error">Invalid password</IonNote>
                                    </IonItem>
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