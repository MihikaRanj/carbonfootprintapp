import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useAuthInit } from '../auth';
import { Basics, Vehicle, Waste, toBasics, toVehicle, toWaste } from '../models';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import React from 'react';
import { trashBin } from 'ionicons/icons';


const CarbonFootprintCalculatorPage: React.FC = () => {
  const { auth } = useAuthInit();
  console.log('Inside CarbonFootprintCalculatorPage auth:', auth);
  // const { userId } = useAuth();
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

  //const carbonFootprint = carbonFootprintPerUser.find((carbonFootprint) => carbonFootprint.userid === "1234");
   
  console.log('Inside CarbonFootprintCalculatorPage userid:', auth?.userId);
  console.log('Inside CarbonFootprintCalculatorPage basics:', basics);
  console.log('Inside CarbonFootprintCalculatorPage vehicles:', vehicles);
  vehicles.map((vehicle) => {
    totalCarbonEmissions = totalCarbonEmissions + vehicle.emissionsForVehicle;
    //waste.wasteEmissionAfterRecycling}
    
  });

  waste.map((waste) => {
    totalCarbonEmissions = totalCarbonEmissions + waste.wasteEmissionAfterRecycling;
  })
  console.log("totalCarbonEmissions", totalCarbonEmissions);

  if (!basics) {
    throw new Error(`No such entry: ${auth?.userId}`);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Calculate Your Carbon Footprint</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonTitle>Demographic Information</IonTitle>
          </IonListHeader>
          {basics.map((basics) =>
            <React.Fragment>
              <IonItem>
                <IonLabel position="stacked">Number of People In Home</IonLabel>
                <IonInput readonly={true} value={basics.peopleInHome}
                />
              </IonItem>
              <IonItem >
                <IonLabel position="stacked">Primary Heating Source</IonLabel>
                <IonInput readonly={true} value={(basics.primaryHeatingSource == "1") ? 'Natural Gas' :
                  ((basics.primaryHeatingSource == "2") ? 'Electric Heat' :
                    ((basics.primaryHeatingSource == "3") ? 'Oil' :
                      ((basics.primaryHeatingSource == "4") ? 'Propane' :
                        ((basics.primaryHeatingSource == "5") ? 'Wood' : 'Do not heat your house'))))}
                />
              </IonItem>
              <IonItem >
                <IonLabel position="stacked">Zipcode</IonLabel>
                <IonInput readonly={true} value={basics.zipCode}
                />
              </IonItem>
            </React.Fragment>
          )}
        </IonList>
        <IonList>
          <IonListHeader>
            <IonTitle>Vehicle Information</IonTitle>
          </IonListHeader>
          {vehicles.map((vehicle) =>
            <React.Fragment>
              <IonItem>
                <IonLabel position="stacked">Vehicle Brand</IonLabel>
                <IonInput readonly={true} value={vehicle.vehicleBrandName}
                />
              </IonItem>
              <IonItem >
                <IonLabel position="stacked">Miles Driven</IonLabel>
                <IonInput readonly={true} value={vehicle.milesDriven}
                />
              </IonItem>
              <IonItem >
                <IonLabel position="stacked">Miles Per Gallon</IonLabel>
                <IonInput readonly={true} value={vehicle.milesPerGallon}
                />
              </IonItem>
              <IonText>
                  Vehicle {vehicle.vehicleBrandName} Carbon Emissions: {vehicle.emissionsForVehicle} pounds of CO2/ year
                </IonText>
            </React.Fragment>
          )}
        </IonList>
        <IonList>
          <IonListHeader>
            <IonTitle>Waste Information</IonTitle>
          </IonListHeader>

          {waste.map((waste) =>
            <React.Fragment>
              <IonText>
                Based on the number of people in your household, your estimated greenhouse gas emissions from waste is {waste.wasteEmissionBasedOnPeopleInHome}.
              </IonText>
              <br/>
                <IonText>
                  If you recycle materials, your waste emissions may be lower.
                </IonText>
              
              <IonItem>
                <IonCheckbox justify="start" disabled={true} checked={waste.recycleCans}>Do you recycle aluminum and steel cans?</IonCheckbox>
              </IonItem>
              <IonText>
                Based on whether your household recycles metal, you save {waste.wasteEmissionsReductionAfterRecyclingCans} average number of pounds of CO2 equivalent per year
              </IonText>
              <IonItem>
                <IonCheckbox justify="start" disabled={true} checked={waste.recyclePlastic}>Do you recycle plastic?</IonCheckbox>
              </IonItem>
              <IonText>
                Based on whether your household recycles plastic, you save {waste.wasteEmissionsReductionAfterRecyclingPlastics} average number of pounds of CO2 equivalent per year.
              </IonText>
              <IonItem>
                <IonCheckbox justify="start" disabled={true} checked={waste.recycleGlass}>Do you recycle glass?</IonCheckbox>
              </IonItem>
              <IonText>
                Based on whether your household recycles glass, you save {waste.wasteEmissionsReductionAfterRecyclingGlass} average number of pounds of CO2 equivalent per year.
              </IonText>
              <IonItem>
                <IonCheckbox justify="start" disabled={true} checked={waste.recycleNewspaper}>Do you recycle newspaper?</IonCheckbox>
              </IonItem>
              <IonText>
                Based on whether your household recycles newspaper, you save {waste.wasteEmissionsReductionAfterRecyclingNewspaper} average number of pounds of CO2 equivalent per year.
              </IonText>
              <IonItem>
                <IonCheckbox justify="start" disabled={true} checked={waste.recycleMagazines}>Do you recycle magazines?</IonCheckbox>
              </IonItem>
              <IonText>
                Based on whether your household recycles magazines, you save {waste.wasteEmissionsReductionAfterRecyclingMagazines} average number of pounds of CO2 equivalent per year
              </IonText> 
              <br/>
              <br/>
              <IonText>Total Waste Emissions after recycling: {waste.wasteEmissionAfterRecycling} </IonText>
             
            </React.Fragment>
          )}
          
        </IonList>
        <IonList>
          <IonListHeader>
            <IonTitle>Your calculated carbon footprint is: {totalCarbonEmissions}</IonTitle>
          </IonListHeader>
        </IonList>
        <IonButton routerLink="/app/tab1">Go Back</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CarbonFootprintCalculatorPage;
