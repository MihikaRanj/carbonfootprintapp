import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
} from '@ionic/react'
import { useEffect, useState } from 'react';
import { firestore, auth } from '../firebase';
import { toVehicle, toBasics, toWaste, Basics, Vehicle, Waste } from '../models';
import { useAuthInit } from '../auth';
import React from 'react';



const Reduce: React.FC = () => {

  const { auth } = useAuthInit();
  const [vehicles, setVehicle] = useState<Vehicle[]>([]);
  const [basics, setBasics] = useState<Basics[]>([]);
  const [waste, setWaste] = useState<Waste[]>([]);
  var totalCarbonEmissions = 0;
  useEffect(() => {
    const vehicleRef = firestore.collection('carbonfootprintperuser').doc(auth?.userId)
      .collection('vehicle');
    console.log('Inside useEffect in cac');
    vehicleRef.get().then(({ docs }) => setVehicle(docs.map(toVehicle)));
    const basicsRef = firestore.collection('carbonfootprintperuser').doc(auth?.userId)
      .collection('basics');
    basicsRef.get().then(({ docs }) => setBasics(docs.map(toBasics)));
    const wasteRef = firestore.collection('carbonfootprintperuser').doc(auth?.userId)
      .collection('waste');
    wasteRef.get().then(({ docs }) => setWaste(docs.map(toWaste)));

  }, [auth?.userId]);

  vehicles.map((vehicle) => {
    totalCarbonEmissions = totalCarbonEmissions + vehicle.emissionsForVehicle;
    //waste.wasteEmissionAfterRecycling}

  });

  waste.map((waste) => {
    totalCarbonEmissions = totalCarbonEmissions + waste.wasteEmissionAfterRecycling;
  })

  var numberOfPeopleInHome = basics.at(0)?.peopleInHome;
  var wasteEmissionsReductionAfterRecyclingCans = Number(numberOfPeopleInHome) * 89;
  var wasteEmissionsReductionAfterRecyclingPlastics = Number(numberOfPeopleInHome) * 36;
  var wasteEmissionsReductionAfterRecyclingGlass = Number(numberOfPeopleInHome) * 25;
  var wasteEmissionsReductionAfterRecyclingNewspaper = Number(numberOfPeopleInHome) * 113;
  var wasteEmissionsReductionAfterRecyclingMagazines = Number(numberOfPeopleInHome) * 27;


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reduce your emissions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonListHeader>
            <IonText>Your customized plan to reduce footprint:</IonText>
          </IonListHeader>
          {vehicles.map((vehicle) =>
            <React.Fragment>
              <IonText>Reduce the number of miles you drive {vehicle.vehicleBrandName} by 1 mile per week to reduce your emissions by {(((vehicle.emissionsForVehicle / vehicle.milesDriven) / totalCarbonEmissions) * 100).toFixed(2)}% </IonText>
              <br />
              <IonText hidden={vehicle.vehicleMaintFlag}>Reduce your carbon emissions by {(vehicle.emissionsForVehicle * 0.04 * 100 / totalCarbonEmissions).toFixed(2)}% by performing regular maintenance on {vehicle.vehicleBrandName}</IonText>
              <br />
            </React.Fragment>
          )}

{waste.map((waste) =>
            <React.Fragment>
              <IonText hidden={waste.recycleCans}>
                If you recycle metal, you will reduce your footprint by {(wasteEmissionsReductionAfterRecyclingCans*100/totalCarbonEmissions).toFixed(2)}%.
              </IonText>
              <br />
              <IonText hidden={waste.recyclePlastic}>
                If you recycle plastic, you will reduce your footprint by {(wasteEmissionsReductionAfterRecyclingPlastics*100/totalCarbonEmissions).toFixed(2)}%.
              </IonText>
              <br />
              <IonText hidden={waste.recycleGlass}>
                If you recycle glass, you will reduce your footprint by {(wasteEmissionsReductionAfterRecyclingGlass*100/totalCarbonEmissions).toFixed(2)}%.
              </IonText>
              <br />
              <IonText hidden={waste.recycleNewspaper}>
                If you recycle newspaper, you will reduce your footprint by {(wasteEmissionsReductionAfterRecyclingNewspaper*100/totalCarbonEmissions).toFixed(2)}%.
              </IonText>
              <br />
              <IonText hidden={waste.recycleMagazines}>
                If you recycle magazines, you will reduce your footprint by {(wasteEmissionsReductionAfterRecyclingMagazines*100/totalCarbonEmissions).toFixed(2)}%.
              </IonText>
           
              
              </React.Fragment>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Reduce

