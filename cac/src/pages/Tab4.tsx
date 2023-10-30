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
                    <IonTitle>More Information</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            <IonItem color={'warning'} href='app/tab4' onClick={()=> {window.open('https://www.fueleconomy.gov', '_system', 'location=yes')}}>Lookup Fuel Economy of your car.</IonItem> 
            <IonItem color={'warning'} href='app/tab4' onClick={()=> {window.open('https://www.investopedia.com/best-carbon-offset-programs-5114611', '_system', 'location=yes')}}>Checkout Carbon Offset Programs</IonItem>
            <IonItem color={'warning'} href='app/tab4' onClick={()=> {window.open('https://www.bhg.com/gardening/yard/compost/diy-compost-bin/#:~:text=One%20of%20the%20easiest%20DIY,adding%20organic%20material%20to%20it.', '_system', 'location=yes')}}>How to make a Compost</IonItem>
            <IonItem color={'warning'} href='app/tab4' onClick={()=> {window.open('https://wayofbeing.co/blogs/news/12-easy-ways-to-minimize-your-digital-carbon-footprint', '_system', 'location=yes')}}>Learn more on using digital devices to help lower your carbon footprint</IonItem>

            </IonContent>
        </IonPage>
    )
}

export default Tab4