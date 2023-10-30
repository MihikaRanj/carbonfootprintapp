import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonText,
} from '@ionic/react'

const Tab3: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Learn</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonText color='primary'>
                    <h3>What is carbon footprint?</h3>
                </IonText>
                <IonText>
                    Carbon footprint is the total amount of greenhouse gases caused by our consumption of fossil fuels. These greenhouse gases can be in the form of carbon dioxide, methane, nitrous oxide, and many others.
                </IonText>
                <IonText color='primary'>
                    <h3>What is the problem of having a carbon footprint?</h3>
                </IonText>
                <IonText>
                    With a lot of GHG (greenhouse gases) in the atmosphere, problems such as global temperature increase, changes in weather patterns, melting ice, and other human health issues can occur more frequently.
                </IonText>
                <IonText color='primary'>
                    <h3>What is net zero?</h3>
                </IonText>
                <IonText>
                    Net zero is where the amount of greenhouse gases produced is balanced with methods of reducing greenhouses gases. When the amount produced and reduced is the same, the total GHG emissions come to 0.
                </IonText>
                <IonText color='primary'>
                    <h3>What are the main reasons for climate change?</h3>
                </IonText>
                <IonText>
                    Fossil fuels used to power electricity and heating is the primary reason, with other sources being transportation, industry, and agriculture.
                </IonText>
                <IonText color='primary'>
                    <h3>What do greenhouse gasses do to the atmosphere?</h3>
                </IonText>
                <IonText>
                    Greenhouse gases help keep the temperature of the earth just right. They are needed, however excess amounts can cause problems to arise.
                </IonText>
                <IonText color='primary'>
                    <h3>What is the greenhouse effect?</h3>
                </IonText>
                <IonText>
                    The greenhouse effect is the process in which greenhouse gases start to build up in Earth’s atmosphere.
                </IonText>
            </IonContent>
        </IonPage>
    )
}

export default Tab3