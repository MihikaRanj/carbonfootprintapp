import { IonBackButton, IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRadio, IonRadioGroup, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useAuthInit } from '../auth';
import { Basics, Waste, toBasics, toWaste } from '../models';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import React from 'react';
import { add, save } from 'ionicons/icons';


const WastePage: React.FC = () => {
  const { auth } = useAuthInit();
  // const { userId } = useAuth();
  const [waste, setWaste] = useState<Waste[]>([]);

  const [basics, setBasics] = useState<Basics[]>([]);


  useEffect(() => {
    console.log('Inside useEffect 1');
    const wasteRef = firestore.collection('carbonfootprintperuser').doc(auth?.userId)
      .collection('waste');
    wasteRef.get().then(({ docs }) => setWaste(docs.map(toWaste)));
    console.log('waste inside useEffect', waste);
    const basicsRef = firestore.collection('carbonfootprintperuser').doc(auth?.userId)
      .collection('basics');
    basicsRef.get().then(({ docs }) => setBasics(docs.map(toBasics)));
  }, [auth?.userId]);

  console.log('basics:', basics);
  console.log('waste inside wastepage', waste);
  var orgRecycleCans = waste.at(0)?.recycleCans;
  var orgRecyclePlastic = waste.at(0)?.recyclePlastic;
  var orgRecycleGlass = waste.at(0)?.recycleGlass;
  var orgRecycleNewspaper = waste.at(0)?.recycleNewspaper;
  var orgRecycleMagazines = waste.at(0)?.recycleMagazines;
  orgRecycleCans = (orgRecycleCans == undefined) ? false : orgRecycleCans;
  orgRecyclePlastic = (orgRecyclePlastic == undefined) ? false : orgRecyclePlastic;
  orgRecycleGlass = (orgRecycleGlass == undefined) ? false : orgRecycleGlass;
  orgRecycleNewspaper = (orgRecycleNewspaper == undefined) ? false : orgRecycleNewspaper;
  orgRecycleMagazines = (orgRecycleMagazines == undefined) ? false : orgRecycleMagazines;

  const [recycleCans, setRecycleCans] = useState(orgRecycleCans);
  const [recyclePlastic, setRecyclePlastic] = useState(orgRecyclePlastic);
  const [recycleGlass, setRecycleGlass] = useState(orgRecycleGlass);
  const [recycleNewspaper, setRecycleNewspaper] = useState(orgRecycleNewspaper);
  const [recycleMagazines, setRecycleMagazines] = useState(orgRecycleMagazines);

  const handleSave = (id: string | undefined) => async () => {
    const wasteRef = firestore.collection('carbonfootprintperuser').doc(auth?.userId)
      .collection('waste');

    console.log('Inside handleSave basics:', basics);
    var numberOfPeopleInHome = basics.at(0)?.peopleInHome;
    if (numberOfPeopleInHome == "") {
      numberOfPeopleInHome = "0";
    }
    var wasteEmissionBasedOnPeopleInHome = Number(numberOfPeopleInHome) * 692;

    console.log('wasteEmissionBasedOnPeopleInHome:', wasteEmissionBasedOnPeopleInHome);

    var wasteEmissionsReductionAfterRecyclingCans = ((((recycleCans == undefined) ? orgRecycleCans : recycleCans) == true) ? 1 : 0) * Number(numberOfPeopleInHome) * 89;
    console.log("wasteEmissionsReductionAfterRecyclingCans:", wasteEmissionsReductionAfterRecyclingCans);
    var wasteEmissionsReductionAfterRecyclingPlastics = ((((recyclePlastic == undefined) ? orgRecyclePlastic : recyclePlastic) == true) ? 1 : 0) * Number(numberOfPeopleInHome) * 36;
    var wasteEmissionsReductionAfterRecyclingGlass = ((((recycleGlass == undefined) ? orgRecycleGlass : recycleGlass) == true) ? 1 : 0) * Number(numberOfPeopleInHome) * 25;
    var wasteEmissionsReductionAfterRecyclingNewspaper = ((((recycleNewspaper == undefined) ? orgRecycleNewspaper : recycleNewspaper) == true) ? 1 : 0) * Number(numberOfPeopleInHome) * 113;
    var wasteEmissionsReductionAfterRecyclingMagazines = ((((recycleMagazines == undefined) ? orgRecycleMagazines : recycleMagazines) == true) ? 1 : 0) * Number(numberOfPeopleInHome) * 27;
    var wasteEmissionsReductionAfterRecycling = wasteEmissionsReductionAfterRecyclingCans + wasteEmissionsReductionAfterRecyclingPlastics + wasteEmissionsReductionAfterRecyclingGlass + wasteEmissionsReductionAfterRecyclingNewspaper + wasteEmissionsReductionAfterRecyclingMagazines;
    var wasteEmissionAfterRecycling = wasteEmissionBasedOnPeopleInHome - wasteEmissionsReductionAfterRecycling;

    if (id == undefined) {
      const updatedWasteData = {
        recycleCans: ((recycleCans == undefined) ? orgRecycleCans : recycleCans),
        recyclePlastic: ((recyclePlastic == undefined) ? orgRecyclePlastic : recyclePlastic),
        recycleGlass: ((recycleGlass == undefined) ? orgRecycleGlass : recycleGlass),
        recycleNewspaper: ((recycleNewspaper == undefined) ? orgRecycleNewspaper : recycleNewspaper),
        recycleMagazines: ((recycleMagazines == undefined) ? orgRecycleMagazines : recycleMagazines),
        wasteEmissionBasedOnPeopleInHome: ((wasteEmissionBasedOnPeopleInHome == undefined) ? 0 : wasteEmissionBasedOnPeopleInHome),
        wasteEmissionsReductionAfterRecyclingCans: ((wasteEmissionsReductionAfterRecyclingCans == undefined) ? 0 : wasteEmissionsReductionAfterRecyclingCans),
        wasteEmissionsReductionAfterRecyclingPlastics: ((wasteEmissionsReductionAfterRecyclingPlastics == undefined) ? 0 : wasteEmissionsReductionAfterRecyclingPlastics),
        wasteEmissionsReductionAfterRecyclingGlass: ((wasteEmissionsReductionAfterRecyclingGlass == undefined) ? 0 : wasteEmissionsReductionAfterRecyclingGlass),
        wasteEmissionsReductionAfterRecyclingNewspaper: ((wasteEmissionsReductionAfterRecyclingNewspaper == undefined) ? 0 : wasteEmissionsReductionAfterRecyclingNewspaper),
        wasteEmissionsReductionAfterRecyclingMagazines: ((wasteEmissionsReductionAfterRecyclingMagazines == undefined) ? 0 : wasteEmissionsReductionAfterRecyclingMagazines),
        wasteEmissionsReductionAfterRecycling: ((wasteEmissionsReductionAfterRecycling == undefined) ? 0 : wasteEmissionsReductionAfterRecycling),
        wasteEmissionAfterRecycling: ((wasteEmissionAfterRecycling == undefined) ? 0 : wasteEmissionAfterRecycling)
      };
      const wasRef = await wasteRef.add(updatedWasteData);

      console.log('updatedWasteData:', updatedWasteData);
    }
    else {
      const updatedWasteData = {
        id: id,
        recycleCans: ((recycleCans == undefined) ? orgRecycleCans : recycleCans),
        recyclePlastic: ((recyclePlastic == undefined) ? orgRecyclePlastic : recyclePlastic),
        recycleGlass: ((recycleGlass == undefined) ? orgRecycleGlass : recycleGlass),
        recycleNewspaper: ((recycleNewspaper == undefined) ? orgRecycleNewspaper : recycleNewspaper),
        recycleMagazines: ((recycleMagazines == undefined) ? orgRecycleMagazines : recycleMagazines),
        wasteEmissionBasedOnPeopleInHome: ((wasteEmissionBasedOnPeopleInHome == undefined) ? 0 : wasteEmissionBasedOnPeopleInHome),
        wasteEmissionsReductionAfterRecyclingCans: ((wasteEmissionsReductionAfterRecyclingCans == undefined) ? 0 : wasteEmissionsReductionAfterRecyclingCans),
        wasteEmissionsReductionAfterRecyclingPlastics: ((wasteEmissionsReductionAfterRecyclingPlastics == undefined) ? 0 : wasteEmissionsReductionAfterRecyclingPlastics),
        wasteEmissionsReductionAfterRecyclingGlass: ((wasteEmissionsReductionAfterRecyclingGlass == undefined) ? 0 : wasteEmissionsReductionAfterRecyclingGlass),
        wasteEmissionsReductionAfterRecyclingNewspaper: ((wasteEmissionsReductionAfterRecyclingNewspaper == undefined) ? 0 : wasteEmissionsReductionAfterRecyclingNewspaper),
        wasteEmissionsReductionAfterRecyclingMagazines: ((wasteEmissionsReductionAfterRecyclingMagazines == undefined) ? 0 : wasteEmissionsReductionAfterRecyclingMagazines),
        wasteEmissionsReductionAfterRecycling: ((wasteEmissionsReductionAfterRecycling == undefined) ? 0 : wasteEmissionsReductionAfterRecycling),
        wasteEmissionAfterRecycling: ((wasteEmissionAfterRecycling == undefined) ? 0 : wasteEmissionAfterRecycling)
      };

      const wasRef = await wasteRef.doc(id).update(updatedWasteData);
      console.log('Updating data.. updatedWasteData:', updatedWasteData);
    }

  };

  return (


    <IonPage>
      <IonHeader>
        <IonToolbar >
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Waste Data</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>
           <IonText>Which of the following products do you currently recycle in your household? </IonText>
          </IonListHeader>

          <React.Fragment>
            <IonItem>
              <IonCheckbox justify="start" checked={(recycleCans == undefined) ? orgRecycleCans : recycleCans} onIonChange={(e) => setRecycleCans((e.detail.checked))}>Do you recycle aluminum and steel cans?</IonCheckbox>
            </IonItem>
            <IonItem>
              <IonCheckbox justify="start" checked={(recyclePlastic == undefined) ? orgRecyclePlastic : recyclePlastic} onIonChange={(e) => setRecyclePlastic((e.detail.checked))}>Do you recycle plastic?</IonCheckbox>
            </IonItem>
            <IonItem>
              <IonCheckbox justify="start" checked={(recycleGlass == undefined) ? orgRecycleGlass : recycleGlass} onIonChange={(e) => setRecycleGlass((e.detail.checked))}>Do you recycle glass?</IonCheckbox>
            </IonItem>
            <IonItem>
              <IonCheckbox justify="start" checked={(recycleNewspaper == undefined) ? orgRecycleNewspaper : recycleNewspaper} onIonChange={(e) => setRecycleNewspaper((e.detail.checked))}>Do you recycle newspaper?</IonCheckbox>
            </IonItem>
            <IonItem>
              <IonCheckbox justify="start" checked={(recycleMagazines == undefined) ? orgRecycleMagazines : recycleMagazines} onIonChange={(e) => setRecycleMagazines((e.detail.checked))}>Do you recycle magazines?</IonCheckbox>
            </IonItem>

          </React.Fragment>

        </IonList>
      </IonContent>
      <IonFooter >
                <IonToolbar>
                    <IonRow>
                        <IonCol width-25 >
                        </IonCol>
                        <IonCol width-25 >
                            <div>
                            <IonButton routerLink="/app/calculate">Back</IonButton>
                            </div>
                        </IonCol>
                        <IonCol width-25>
                            <IonButton onClick={handleSave(waste.at(0)?.id)}>Save</IonButton>
                        </IonCol>
                        <IonCol width-25 >
                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonFooter>
    </IonPage>
  );
};

export default WastePage;
