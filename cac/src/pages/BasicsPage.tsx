import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRadio, IonRadioGroup, IonTitle, IonToolbar } from '@ionic/react';
import { useAuthInit } from '../auth';
import { Basics, Vehicle, toBasics, toVehicle } from '../models';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import React from 'react';
import { add, save } from 'ionicons/icons';


const BasicsPage: React.FC = () => {
  const { auth } = useAuthInit();
  console.log('Inside Basicspage auth:', auth);
  // const { userId } = useAuth();
  const [basics, setBasics] = useState<Basics[]>([]);

  const [peopleInHome, setPeopleInHome] = useState('');

  const [zipCode, setZipCode] = useState('');
  const [id, setId] = useState('');
  const [primaryHeatingSource, setPrimaryHeatingSource] = useState('');
  useEffect(() => {
    console.log('Inside useEffect 1');
    const basicsRef = firestore.collection('carbonfootprintperuser').doc(auth?.userId)
      .collection('basics');
    basicsRef.get().then(({ docs }) => setBasics(docs.map(toBasics)));
    console.log('basics inside useEffect', basics);
    setPrimaryHeatingSource(String(basics.at(0)?.primaryHeatingSource));
  }, [auth?.userId]);


  var orgPrimaryHeatingSource = basics.at(0)?.primaryHeatingSource;
  var orgPeopleInHome = basics.at(0)?.peopleInHome;
  var orgZipCode = basics.at(0)?.zipCode;

  //const carbonFootprint = carbonFootprintPerUser.find((carbonFootprint) => carbonFootprint.userid === "1234");
  console.log('Inside Basicspage userid:', auth?.userId);
  console.log('Basicspage', basics);

  console.log('primar', orgPrimaryHeatingSource);




  const handleSave = (id: string | undefined) => async () => {
    const basicsRef = firestore.collection('carbonfootprintperuser').doc(auth?.userId)
      .collection('basics');
   
      
    const updatedBasicsData = { id: id, peopleInHome: ((peopleInHome == "undefined") ? orgPeopleInHome : peopleInHome), 
    primaryHeatingSource: ((primaryHeatingSource == "undefined") ? orgPrimaryHeatingSource : primaryHeatingSource), zipCode: ((zipCode == "undefined") ? orgZipCode : zipCode)
      };
    const basRef = await basicsRef.doc(id).update(updatedBasicsData);
    console.log('id:', id);
    console.log('updatedBasicsData:', updatedBasicsData);
    console.log('saved:', basRef);
  };

  console.log("primaryHeatingSource:", primaryHeatingSource);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Enter your demographic information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonTitle>Demographic Information</IonTitle>
            <IonFab vertical="center" horizontal="end">
              <IonFabButton onClick={handleSave(basics.at(0)?.id)}>
                <IonIcon icon={save} />
              </IonFabButton>
            </IonFab>
          </IonListHeader>

          <React.Fragment>
            <IonItem>
              <IonLabel position="stacked">Number of People In Home</IonLabel>
              <IonInput placeholder={String(basics.at(0)?.peopleInHome)} value={peopleInHome} onIonChange={(e) => setPeopleInHome(String(e.target.value))}
              />
            </IonItem>
            <IonRadioGroup value={(primaryHeatingSource == "undefined") ? orgPrimaryHeatingSource : primaryHeatingSource} onIonChange={(e) => setPrimaryHeatingSource(String(e.target.value))}>
              <IonListHeader>
                <IonLabel>Primary Heating Source: {primaryHeatingSource}</IonLabel>
              </IonListHeader>
              <IonItem>
                <IonLabel>Natural Gas</IonLabel>
                <IonRadio slot="start" value="1" />
              </IonItem>
              <IonItem>
                <IonLabel>Electric Heat</IonLabel>
                <IonRadio slot="start" value="2" />
              </IonItem>
              <IonItem>
                <IonLabel>Oil</IonLabel>
                <IonRadio slot="start" value="3" />
              </IonItem>
              <IonItem>
                <IonLabel>Propane</IonLabel>
                <IonRadio slot="start" value="4" />
              </IonItem>
              <IonItem>
                <IonLabel>Wood</IonLabel>
                <IonRadio slot="start" value="5" />
              </IonItem>
              <IonItem>
                <IonLabel>Do not heat your house</IonLabel>
                <IonRadio slot="start" value="6" />
              </IonItem>
            </IonRadioGroup>

            <IonItem >
              <IonLabel position="stacked">Zipcode</IonLabel>
              <IonInput placeholder={String(basics.at(0)?.zipCode)} value={zipCode} onIonChange={(e) => setZipCode(String(e.target.value))}
              />
            </IonItem>
          </React.Fragment>

        </IonList>
        <IonButton routerLink="/app/tab1">Go Back</IonButton>
        <IonButton routerLink="/app/vehicle">Add Vehicles</IonButton>
        <IonButton routerLink="/app/cfc">Calculate Your Carbon Footprint</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default BasicsPage;
