import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import React, { Component } from 'react';
import { View, Text } from 'react-native';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  registerForPushNotificationsAsync=async()=> {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token)
  }
  

  componentDidMount(){
    this.registerForPushNotificationsAsync();
  }
  render() {
    return (
      <View>
        <Text> App </Text>
      </View>
    );
  }
}
