import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonText,
    IonNavLink,
} from '@ionic/react'

const Tab4: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Learn more</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            <IonText>Lookup Fuel Economy of your car.
            <IonNavLink color='blue' onClick={()=> {window.open('https://www.fueleconomy.gov', '_system', 'location=yes')}}> Click here..</IonNavLink> 
            </IonText>

            </IonContent>
        </IonPage>
    )
}

export default Tab4