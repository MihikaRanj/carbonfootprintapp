import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRadio, IonRadioGroup, IonRow, IonText, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { useAuthInit } from '../auth';
import { Basics, Vehicle, toBasics, toVehicle } from '../models';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import React from 'react';
import { add, reload, save } from 'ionicons/icons';
import { Redirect } from 'react-router';


const BasicsPage: React.FC = () => {
  const { auth } = useAuthInit();
  const navigation = useIonRouter();
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

  console.log('before setting orgPrimaryHeatingSource', orgPrimaryHeatingSource);
  orgPrimaryHeatingSource = (orgPrimaryHeatingSource == undefined) ? "0" : orgPrimaryHeatingSource;
  orgPeopleInHome = (orgPeopleInHome == undefined) ? "0" : orgPeopleInHome;

  //const carbonFootprint = carbonFootprintPerUser.find((carbonFootprint) => carbonFootprint.userid === "1234");
  console.log('Inside Basicspage userid:', auth?.userId);
  console.log('Basicspage', basics);

  console.log('primar', orgPrimaryHeatingSource);

  console.log("primaryHeatingSource:", primaryHeatingSource);

  const handleSave = (id: string | undefined) => async () => {
    console.log("Inside handleSave peopleInHome: ", peopleInHome);
    console.log("Inside handleSave orgPeopleInHome: ", orgPeopleInHome);
    console.log("Inside handleSave peopleInHome: ", primaryHeatingSource);
    console.log("Inside handleSave orgPeopleInHome: ", orgPrimaryHeatingSource);
    const basicsRef = firestore.collection('carbonfootprintperuser').doc(auth?.userId)
      .collection('basics');

    
    
    console.log('Before saving peopleInHome:', peopleInHome);
    console.log('Before saving orgPeopleInHome:', orgPeopleInHome);
    if (id == undefined) {
      const updatedBasicsData = {
        peopleInHome: ((peopleInHome == undefined) ? orgPeopleInHome : peopleInHome),
        primaryHeatingSource: (((primaryHeatingSource == undefined) || (primaryHeatingSource == "undefined") )? orgPrimaryHeatingSource : primaryHeatingSource), zipCode: ((zipCode == undefined) ? orgZipCode : zipCode)
      };
      console.log('Adding basics:', basics);
      const basRef = await basicsRef.add(updatedBasicsData);
      basicsRef.get().then(({ docs }) => setBasics(docs.map(toBasics)));
      console.log('After saving updatedBasicsData:', basics);
    }
    else {
      const updatedBasicsData = {id:id,
        peopleInHome: ((peopleInHome == undefined) ? orgPeopleInHome : peopleInHome),
        primaryHeatingSource: (((primaryHeatingSource == undefined) || (primaryHeatingSource == "undefined") )? orgPrimaryHeatingSource : primaryHeatingSource), zipCode: ((zipCode == undefined) ? orgZipCode : zipCode)
      };
      console.log('Updating basics:');
      const basRef = await basicsRef.doc(id).update(updatedBasicsData);
      console.log('After saving updatedBasicsData:', updatedBasicsData);
    }
    console.log('id:', id);
    //return <Redirect to="/app" />;
  };

  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Demographic Data</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonText>Enter your household information:</IonText>
          </IonListHeader>
          <React.Fragment>
            <IonItem>
              <IonLabel position="stacked">Number of People In Home <IonText color="danger">(Required)</IonText></IonLabel>
              <IonInput placeholder={basics.at(0)?.peopleInHome} value={peopleInHome} onIonInput={(e) => setPeopleInHome(String(e.target.value))}
              />
            </IonItem>
            <IonRadioGroup value={(primaryHeatingSource == "undefined") ? orgPrimaryHeatingSource : primaryHeatingSource} onIonChange={(e) => setPrimaryHeatingSource(String(e.target.value))}>
              <IonListHeader>
                <IonLabel>Primary Heating Source</IonLabel>
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
              <IonInput placeholder={basics.at(0)?.zipCode} value={zipCode} onIonInput={(e) => setZipCode(String(e.target.value))}
              />
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
                            <IonButton onClick={handleSave(basics.at(0)?.id)}>Save</IonButton>
                        </IonCol>
                        <IonCol width-25 >
                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonFooter>
    </IonPage>
  );
};

export default BasicsPage;
