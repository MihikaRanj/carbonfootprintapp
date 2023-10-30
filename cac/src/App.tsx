import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonLoading, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Tabs from './pages/Tabs';


import { auth } from './firebase';
import { useState, useEffect } from 'react';
import { AuthContext, useAuthInit } from './auth';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
setupIonicReact();


const App: React.FC = () => {
  console.log('Before calling useAuthInit:');
  const { loading, auth } = useAuthInit();
  
  console.log('rendering App with auth:', auth);
  console.log('rendering App with loading:', loading);
  if (loading){
    return <IonLoading isOpen />;
  } 
  console.log('rendering App with auth:', auth!.loggedIn);
  /*if (!auth!.loggedIn) {
    console.log('loggedInApp', auth!.loggedIn);
    return <Redirect to="/" />;
  }*/
  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn: auth!.loggedIn }}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route path="/home" component={HomePage} />
            <Route path="/app" component={Tabs} />
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;