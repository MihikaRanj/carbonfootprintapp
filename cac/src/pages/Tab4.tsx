import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonText,
    IonNavLink,
    IonItem,
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
            <IonItem color={'warning'} href='app/tab4' onClick={()=> {window.open('https://www.fueleconomy.gov', '_system', 'location=yes')}}>Lookup Fuel Economy of your car.</IonItem> 
            <IonItem color={'warning'} href='app/tab4' onClick={()=> {window.open('https://www.investopedia.com/best-carbon-offset-programs-5114611', '_system', 'location=yes')}}>Checkout Carbon Offset Programs</IonItem>

            </IonContent>
        </IonPage>
    )
}

export default Tab4