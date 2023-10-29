import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    useIonRouter,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonText,
    IonLoading,
} from '@ionic/react'
import { auth } from '../firebase';

import { useState } from 'react';
import { useAuth } from '../auth';
import { Redirect } from 'react-router';

const Login: React.FC = () => {
    const { loggedIn } = useAuth();
    const navigation = useIonRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({ loading: false, error: false });


    const handleLogin = async () => {
        try {
            setStatus({ loading: true, error: false })
            //setStatus({ loading: false, error: true })
            const credential = await auth.signInWithEmailAndPassword(email, password)
            /*setStatus({ loading: false, error: false });*/
            console.log('credential:', credential);
            console.log('loggedIn Inside handleLogin:', loggedIn);
            //navigation.push('/app', 'root', 'replace')
        } catch (error) {
            setStatus({ loading: false, error: true })
            console.log('error:', Error);
        }
    };

    if (loggedIn) {
        console.log('loggedInInLogin:', loggedIn);
       // return <Redirect to="/app" />;
       return <Redirect to="/home" />;
    }
    console.log('loggedInInLogin:', loggedIn);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">Email</IonLabel>
                        <IonInput type="email" value={email} 
                            onIonChange={(event) => setEmail(String(event.detail.value))}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput type="password" value={password} 
                            onIonChange={(event) => setPassword(String(event.detail.value))}
                        />
                    </IonItem>
                </IonList>
                {status.error &&
                    <IonText color="danger"> Invalid credentials</IonText>
                }
                <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
                <IonButton expand="block" fill="clear" routerLink="/register">
                    Don't have an account?
                </IonButton>
                <IonLoading isOpen={status.loading} />
            </IonContent>
        </IonPage>
    );
};

export default Login;