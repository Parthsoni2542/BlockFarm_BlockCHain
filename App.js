/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createStore} from 'redux';
import {StatusBar, View} from 'react-native';
import {useDeviceToken} from './src/hooks/useDeviceToken';
import Pushy from 'pushy-react-native';

import StackNavigation from './src/navigation/stackNavigation';
import ProfileScreen from './src/screens/profile';
import ProfileSecond from './src/screens/profileSecond';
import {AuthContext} from './src/context/AuthContext';
import MessagesScreen from './src/MessageScreen';
import {Provider} from 'react-redux';
import reducer from './src/redux/reducer/auth';
const store = createStore(reducer);

const App = () => {
  const {deviceToken} = useDeviceToken();
  console.log('🚀 ~ file: App.js ~ line 18 ~ App ~ deviceToken ', deviceToken);

  React.useEffect(() => {
    console.log(
      '🚀 ~ file: App.js ~ line 20 ~ React.useEffect ~ deviceToken',
      deviceToken,
    );

    Pushy.setNotificationListener(async data => {
      // Print notification payload data
      console.log('Received notification: ' + JSON.stringify(data));

      // Notification title
      let notificationTitle = 'BlockFarm';

      // Attempt to extract the "message" property from the payload: {"message":"Hello World!"}
      let notificationText = data.message || 'Test notification';

      // Display basic system notification
      Pushy.notify(notificationTitle, notificationText, data);

      // Clear iOS badge count
      Pushy.setBadge(0);
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      {/* <StackNavigation /> */}
      <Provider store={store}>
        <AuthContext.Provider value={AuthContext}>
          {/* <ProfileScreen /> */}
          <StackNavigation />
        </AuthContext.Provider>
      </Provider>
      {/* <ProfileScreen /> */}
    </View>
  );
};

export default App;
