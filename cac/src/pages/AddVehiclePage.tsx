import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useAuthInit } from '../auth';
import { Vehicle } from '../models';
import { useState } from 'react';
import { firestore } from '../firebase';
import React from 'react';
import { useHistory } from 'react-router';

const AddVehiclePage: React.FC = () => {
  const { auth } = useAuthInit();
  const history = useHistory();
  const [milesDriven, setMilesDriven] = useState('');
  const [milesPerGallon, setMilesPerGallon] = useState('');
  const [vehicleBrandName, setVehicleBrandName] = useState('');
  const [vehicleMaintFlag, setVehicleMaintFlag] = useState(false);

  console.log('Inside vehicle auth:', auth);
  const [vehicles, setVehicle] = useState<Vehicle[]>([]);

  const handleSave = async () => {
    const vehiclesRef = firestore.collection('carbonfootprintperuser').doc(auth?.userId)
      .collection('vehicle');
    var milesDrivenPerYear = Number(milesDriven)*52;
    var gallonsOfGas= milesDrivenPerYear/Number(milesPerGallon);
    var emissionsForVehicle = ((Number(milesDriven)*52)/Number(milesPerGallon))*19.6*100/98.65;
    if (vehicleMaintFlag == false) {
      emissionsForVehicle = emissionsForVehicle*1.04;
    }

    console.log("milesDrivenPerYear: ", milesDrivenPerYear);
    console.log("gallonsOfGas: ", gallonsOfGas);
    console.log("emissionsForVehicle: ", emissionsForVehicle);

    const vehicleData = { vehicleBrandName, milesDriven, milesPerGallon , vehicleMaintFlag, emissionsForVehicle};
    const vehicleRef = await vehiclesRef.add(vehicleData);
    console.log('saved:', vehicleRef.id);
    history.goBack();
  };


  console.log('Inside vehicle userid:', auth?.userId);
  console.log('Inside vehicle vehicles:', vehicles);

  const handleCancel = async () => {
    history.goBack();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add Vehicle</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked" >Vehicle Make/ Brand <IonText color="danger">(Required)</IonText></IonLabel> 
            <IonInput required={true} value={vehicleBrandName}
              onIonChange={(event) => setVehicleBrandName(String(event.detail.value))}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">How many miles do you drive per week? <IonText color="danger">(Required)</IonText></IonLabel>
            <IonInput value={milesDriven}
              onIonChange={(event) => setMilesDriven(String(event.detail.value))}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">What is your car's fuel economy in Miles per Gallon? <IonText color="danger">(Required)</IonText></IonLabel>
            
            <IonText>Tip: The national average is 21.6 miles per gallon
            <IonButton shape="round" href="#" onClick={()=> {window.open('https://www.fueleconomy.gov', '_system', 'location=yes')}}  routerLink="/app/vehicle">Lookup Fuel Economy of your car</IonButton> 
            </IonText>
            <IonTextarea value={milesPerGallon}
              onIonChange={(event) => setMilesPerGallon(String(event.detail.value))}
            />

          </IonItem>
          <IonItem>
            <IonText>Do you perform regular maintenance on your vehicle?</IonText>
            <IonCheckbox justify="start" checked={false} onIonChange={(e) => setVehicleMaintFlag((e.detail.checked))}>Yes</IonCheckbox>
            </IonItem>
          <IonButton onClick={handleSave}>Save</IonButton>
          <IonButton onClick={handleCancel}>Cancel</IonButton>
          <IonButton routerLink="/app/tab1">Go Back</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default AddVehiclePage;