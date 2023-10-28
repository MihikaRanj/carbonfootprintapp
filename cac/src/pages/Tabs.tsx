import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
} from '@ionic/react'
import { Redirect, Route } from 'react-router'
import Tab1 from './Tab1'
import Tab2 from './Tab2'

import { ellipse, home as homeIcon, logOut, settings as settingsIcon, square, star, triangle } from 'ionicons/icons';
import Tab3 from './Tab3'
import Tab4 from './Tab4'
import { useAuth, useAuthInit } from '../auth'
import CarbonFootprintCalculatorPage from './CarbonFootprintCalculatorPage'
import { auth } from '../firebase';
import VehiclePage from './VehiclePage';
import BasicsPage from './Basicspage';
import AddVehiclePage from './AddVehiclePage';
import WastePage from './WastePage';

const Tabs: React.FC = () => {
   /* const { loading, auth } = useAuthInit();
    console.log('loggedInApp', auth!.loggedIn);*/
    const { loggedIn } = useAuth();
    console.log('loggedInApp', loggedIn);

    const onLogout = () => {
        auth.signOut();
        console.log('logging out:', auth);
    }
    
    if (!loggedIn) {
        console.log('redirecting to /', loggedIn);
        return <Redirect to="/" />;
      }
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path='/app/tab1' component={Tab1}/>
                <Route path='/app/tab2' component={Tab2}/>
                <Route path='/app/tab3' component={Tab3}/>
                <Route path='/app/tab4' component={Tab4}/>
                <Route path='/app/cfc' component={CarbonFootprintCalculatorPage}/>
                <Route path='/app/vehicle' component={VehiclePage}/>
                <Route path='/app/vehicle/add' component={AddVehiclePage}/>
                <Route path='/app/basics' component={BasicsPage}/>
                <Route path='/app/waste' component={WastePage}/>
                <Route exact path="/app">
                    <Redirect to="/app/tab1" />
                </Route>
                <Route exact path="/app/tab1/:id">
                    <CarbonFootprintCalculatorPage />
                </Route>
            </IonRouterOutlet>
            <IonTabBar slot='bottom'>
                <IonTabButton tab='tab1' href='/app/tab1'>
                    <IonIcon icon={ellipse}/>
                    <IonLabel>Calculate</IonLabel>
                </IonTabButton>
                <IonTabButton tab='tab2' href='/app/tab2'>
                    <IonIcon icon={triangle}></IonIcon>
                    <IonLabel>Reduce</IonLabel>
                </IonTabButton>
                <IonTabButton tab='tab3' href='/app/tab3'>
                    <IonIcon icon={square}></IonIcon>
                    <IonLabel>Learn</IonLabel>
                </IonTabButton>
                <IonTabButton tab='tab4' href='/app/tab4'>
                    <IonIcon icon={star}></IonIcon>
                    <IonLabel>Extra</IonLabel>
                </IonTabButton>
                <IonTabButton tab='tab5' onClick={() => onLogout()} href='/'>
                    <IonIcon icon={logOut}></IonIcon>
                    <IonLabel>Logout</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default Tabs