import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useAuthInit } from '../auth';
import { Basics, Vehicle, toBasics, toVehicle } from '../models';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import React from 'react';
import { add, pencil, save, trashBin } from 'ionicons/icons';
import { useHistory } from 'react-router';

const VehiclePage: React.FC = () => {
  const { auth } = useAuthInit();
  console.log('Inside vehicle auth:', auth);
  const history = useHistory();

  const [vehicles, setVehicle] = useState<Vehicle[]>([]);
  useEffect(() => {
    const vehicleRef = firestore.collection('carbonfootprintperuser').doc(auth?.userId)
      .collection('vehicle');
    console.log(firestore.collection('carbonfootprintperuser').doc(auth?.userId));
    //vehicleRef.get().then(({ docs }) => setVehicle(docs.map(toVehicle)));
    return vehicleRef.onSnapshot(({ docs }) => setVehicle(docs.map(toVehicle)));
  }, [auth?.userId]);

  const handleDelete = (idToDelete: string | undefined) => async () => {
    console.log('Inside handleDelete:', idToDelete);
    const vehicleRef = firestore.collection('carbonfootprintperuser').doc(auth?.userId)
      .collection('vehicle').doc(idToDelete);
    await vehicleRef.delete();
    //history.goBack();
  };

  const handleGoBack = async () => {
    history.goBack();
  }

  console.log('Inside vehicle userid:', auth?.userId);
  console.log('Inside vehicle vehicles:', vehicles);
  console.log('Inside vehicle vehicles:', );
  if (!vehicles) {
    throw new Error(`No such entry: ${auth?.userId}`);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Enter household vehicle information</IonTitle>
          <IonFab vertical="center" horizontal="end">
            <IonFabButton routerLink="/app/vehicle/add">
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
         
          {vehicles.map((vehicle) =>
           
           
         
            <React.Fragment>
              <IonListHeader>
              <IonTitle>Vehicles Data Entered</IonTitle>
              </IonListHeader>
              <IonItem>
                <IonLabel position="stacked">Vehicle Make/ Brand</IonLabel>
                <IonInput readonly={true}  value={vehicle.vehicleBrandName}
                />
                <IonFab vertical="center" horizontal="end">
                  <IonFabButton onClick={handleDelete(vehicle.id)}>
                    <IonIcon icon={trashBin} />
                  </IonFabButton>
                </IonFab>
              </IonItem>
              <IonItem >
                <IonLabel position="stacked">How many miles do you drive per week?</IonLabel>
                <IonInput readonly={true}  value={vehicle.milesDriven}
                />
              </IonItem>
              <IonItem >
                <IonLabel position="stacked">What is your car's fuel economy in Miles per Gallon?</IonLabel>
                <IonInput readonly={true}  value={vehicle.milesPerGallon}
                />
              </IonItem>
            </React.Fragment>
          )}
        </IonList>
        <IonButton routerLink="/app/tab1">Go Back</IonButton>
        <IonButton routerLink="/app/cfc">Calculate Your Carbon Footprint</IonButton>
      </IonContent>



    </IonPage>
  );
};

export default VehiclePage;