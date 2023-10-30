import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
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
            <IonLabel position="stacked">How many miles do you drive per week? 
            <br/><IonText color="danger">(Required)</IonText></IonLabel>
            <IonInput value={milesDriven}
              onIonChange={(event) => setMilesDriven(String(event.detail.value))}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked" >What is your car's fuel economy? <IonText color="danger">(Required)</IonText> </IonLabel>
            <IonText>Tip: The national average is 21.6 miles per gallon. Check Extra tab for help finding this. </IonText>
            <IonInput value={milesPerGallon}
              onIonChange={(event) => setMilesPerGallon(String(event.detail.value))}
            />

          </IonItem>
          <IonItem>
            <IonText>Do you perform regular maintenance on your vehicle?</IonText>
            <IonCheckbox justify="start" checked={false} onIonChange={(e) => setVehicleMaintFlag((e.detail.checked))}>Yes</IonCheckbox>
            </IonItem>
        </IonList>
      </IonContent>
      <IonFooter >
                <IonToolbar>
                    <IonRow>
                        <IonCol width-25 >
                        </IonCol>
                        <IonCol width-25 >
                            <div>
                            <IonButton routerLink="/app/vehicle">Back</IonButton>
                            </div>
                        </IonCol>
                        <IonCol width-25>
                            <IonButton onClick={handleSave}>Save</IonButton>
                        </IonCol>
                        <IonCol width-25 >
                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonFooter>
    </IonPage>
  );
}

export default AddVehiclePage;