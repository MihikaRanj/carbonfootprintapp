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
          <div id="list">
            <h5>Your customized plan to reduce footprint:</h5>
            <ul>
              {vehicles.map((vehicle) =>
                <React.Fragment>
                  <li>Reduce the number of miles you drive {vehicle.vehicleBrandName} by 1 mile per week to reduce your emissions by {(((vehicle.emissionsForVehicle / vehicle.milesDriven) / totalCarbonEmissions) * 100).toFixed(2)}% </li>
                  <li hidden={vehicle.vehicleMaintFlag}>Reduce your carbon emissions by {(vehicle.emissionsForVehicle * 0.04 * 100 / totalCarbonEmissions).toFixed(2)}% by performing regular maintenance on {vehicle.vehicleBrandName}</li>
                </React.Fragment>
              )}

              {waste.map((waste) =>
                <React.Fragment>
                  <li hidden={waste.recycleCans}>
                    If you recycle metal, you will reduce your footprint by {(wasteEmissionsReductionAfterRecyclingCans * 100 / totalCarbonEmissions).toFixed(2)}%.
                  </li>
                  <li hidden={waste.recyclePlastic}>
                    If you recycle plastic, you will reduce your footprint by {(wasteEmissionsReductionAfterRecyclingPlastics * 100 / totalCarbonEmissions).toFixed(2)}%.
                  </li>
                  <li hidden={waste.recycleGlass}>
                    If you recycle glass, you will reduce your footprint by {(wasteEmissionsReductionAfterRecyclingGlass * 100 / totalCarbonEmissions).toFixed(2)}%.
                  </li>
                  <li hidden={waste.recycleNewspaper}>
                    If you recycle newspaper, you will reduce your footprint by {(wasteEmissionsReductionAfterRecyclingNewspaper * 100 / totalCarbonEmissions).toFixed(2)}%.
                  </li>
                  <li hidden={waste.recycleMagazines}>
                    If you recycle magazines, you will reduce your footprint by {(wasteEmissionsReductionAfterRecyclingMagazines * 100 / totalCarbonEmissions).toFixed(2)}%.
                  </li>
                </React.Fragment>
              )}
             </ul>
          </div>

            <br />
            <div id="list">
            <ul>
            <h5>Other Ways to Reduce Your Footprint:</h5>
            <li>Switch lights off unless your using them.</li>
            <li>Try biking or walking to nearby places.</li>
            <li>Use reusable bags while shopping.</li>
            <li>Wash your clothes in cold water.</li>
            <li>Try not to buy fast fashion.</li>
            <li>Don't throw away clothes, instead donate it or give it to a thrift store (unless it is severely damaged).</li>
            <li>Don't leave water on unless it is in using.</li>
            <li>Eat food that is currently in season.</li>
            <li>Create a compost (look on extra page to find some links on how to make a compost).</li>
            </ul>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Reduce

