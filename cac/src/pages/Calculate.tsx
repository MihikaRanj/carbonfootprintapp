import {
    IonPage,
    IonContent,
    IonButton
} from '@ionic/react'

import CarbonFootprintCalculatorPage from './CarbonFootprintCalculatorPage';
import { Redirect } from 'react-router';


const Calculate: React.FC = () => {

    const addWaste = async () => {
    };
    

    
    const viewCFP = () => {
        console.log("inside viewCFP");
        return <Redirect to="/" />;
    }

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonButton expand="block" routerLink='/app/basics'>Demographic Information
                </IonButton>
                <IonButton expand="block" routerLink="/app/waste">Waste Information
                </IonButton>
                <IonButton expand="block" routerLink="/app/vehicle">Vehicle Information
                </IonButton>
                <IonButton expand="block" routerLink="/app/cfc">View your Carbon Footprint
                </IonButton>
            </IonContent>

        </IonPage>
    )
}

export default Calculate