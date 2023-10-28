import {
    IonPage,
    IonContent,
    IonButton
} from '@ionic/react'

import CarbonFootprintCalculatorPage from './CarbonFootprintCalculatorPage';
import { Redirect } from 'react-router';


const Tab1: React.FC = () => {

    const addWaste = async () => {
    };
    

    
    const viewCFP = () => {
        console.log("inside viewCFP");
        return <Redirect to="/" />;
    }

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonButton expand="block" routerLink="/app/waste"> waste
                </IonButton>
                <IonButton expand="block" routerLink='/app/basics'>demographic Information
                </IonButton>
                <IonButton expand="block" routerLink="/app/vehicle">vehicle
                </IonButton>
                <IonButton expand="block" routerLink="/app/cfc">view your carbon footprint
                </IonButton>
            </IonContent>

        </IonPage>
    )
}

export default Tab1