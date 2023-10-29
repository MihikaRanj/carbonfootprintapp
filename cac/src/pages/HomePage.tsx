import {
    IonPage,
    IonContent,
    IonButton,
    IonText
} from '@ionic/react'

import { Redirect } from 'react-router';


const HomePage: React.FC = () => {
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonText>Welcome to the Carbon footprint app. </IonText>
                <IonButton expand="block" routerLink="/app">Get Started</IonButton>
            </IonContent>

        </IonPage>
    )
}

export default HomePage;