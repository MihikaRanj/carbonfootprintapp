import {
    IonPage,
    IonContent,
    IonButton,
    IonText,
    IonTabBar,
    IonFooter,
    IonCard,
    IonCardTitle,
    IonImg,
    IonToolbar,
    IonCol,
    IonRow
} from '@ionic/react'

import { Redirect } from 'react-router';


const LandingPage: React.FC = () => {
    return (
        <IonPage>
            <IonImg
                src="assets/imgs/logo1.JPG"
            ></IonImg>
            <IonContent fullscreen={true} className="ion-padding" >
                <IonText><h3>Welcome to the Carbon footprint app. </h3></IonText>
                <IonText>This app will help you calculate your household's carbon footprint and help identify ways to reduce your carbon footprint.</IonText>
                <br />
                <IonText>Sign Up now to get started and learn about ways on how you can contribute to reduce the carbon emissions and make the environment green!</IonText>
            </IonContent>
            <IonFooter >
                <IonToolbar>
                    <IonRow>
                        <IonCol width-25 >
                        </IonCol>
                        <IonCol width-25 >
                            <div>
                            <IonButton color={'success'} routerLink="/login">Sign In</IonButton>
                            </div>
                        </IonCol>
                        <IonCol width-25>
                            <IonButton color={'success'} routerLink="/register">Sign Up</IonButton>
                        </IonCol>
                        <IonCol width-25 >
                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    )
}

export default LandingPage;