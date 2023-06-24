import React from 'react';
import { Route, Switch } from "react-router-dom";
import { DefaultLayout } from './Layout/DefaultLayout/DefaultLayout';
import Login from './Routes/Login/Login';
import Register from './Routes/Register/Register';
import Bowls from './Routes/Bowls/Bowls';
import BowlDetails from './Routes/BowlDetails/BowlDetails';
import { UserProvider } from './Context/UserContext';
import PrivateRoute from "./Routes/PrivateRoute/PrivateRoute";
import BowlCreate from "./Routes/BowlCreate/BowlCreate";
import Menus from "./Routes/Menus/Menus";
import MenuDetails from "./Routes/MenuDetails/MenuDetails";
import MenuCreate from "./Routes/MenuCreate/MenuCreate";
import { get } from './Utils/Request';

function App() {

  const urlBase64ToUint8Array = (base64String: string) => {
		const padding = '='.repeat((4 - base64String.length % 4) % 4);
		const base64 = (base64String + padding)
			.replace(/-/g, '+')
			.replace(/_/g, '/');

		const rawData = window.atob(base64);
		const outputArray = new Uint8Array(rawData.length);

		for (let i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i);
		}
		return outputArray;
	}
	
	const createNotificationSubscription = (pushServerPublicKey: string) => {
		return navigator.serviceWorker.ready.then(function(serviceWorker) {
      console.log('dasdasdd')
			return serviceWorker.pushManager
				.subscribe({
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array(pushServerPublicKey)
				})
				.then(function(pushSubscription) {
					var subJSObject = JSON.parse(JSON.stringify(pushSubscription));
					var subscription = {
						'endpoint': subJSObject.endpoint,
						'authToken': subJSObject.keys.auth,
						'publicKey': subJSObject.keys.p256dh
					}

					return subscription;
				});
		});
	}

  Notification.requestPermission(function(status) {
      
    if (status == 'granted') {
      get('/v1/notification/token').then((response) => {
        createNotificationSubscription(response.data.token)
        .then(function(subscription) {
            // Alle Werte ausgeben
                  console.log(subscription);
        });
      })
    }
  });


  return (    
    <div className={"text-text-primary"}>
      <UserProvider>
        <DefaultLayout>
          <Switch>
            <Route exact path="/"><Login/></Route>
            <Route exact path="/login"><Login/></Route>
            <Route exact path="/register"><Register/></Route>
            {
            //<PrivateRoute  path="/user"  component={User} exact />
            }
            <PrivateRoute  path="/menus"  component={Menus} exact />
            <PrivateRoute  path="/menus/create"  component={MenuCreate} exact />
            <PrivateRoute  path="/menus/:id"  component={MenuDetails} exact />
            <PrivateRoute  path="/bowls"  component={Bowls} exact />
            <PrivateRoute  path="/bowls/create"  component={BowlCreate} exact />
            <PrivateRoute  path="/bowls/:id"  component={BowlDetails} exact />
          </Switch>
        </DefaultLayout>
      </UserProvider>
    </div>
  );
}

export default App;
