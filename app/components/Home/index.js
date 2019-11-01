import React,{ Component } from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import { Notifications } from 'expo';
import img from '../assets/background.jpg';
import firebase from '../Config/config.js';
import * as Permissions from 'expo-permissions';

export default class Home extends Component {
    constructor(props) {
        super(props);
           this.state = {
            text: "",
            num: "",
            result: "",
            siteUser:null,
        };
    }
    writeData=()=>{
        console.log(this.state.text);
        console.log(this.state.num);
        firebase.database().ref('mobile/' ).set({
            text:this.state.text,
            number:this.state.num,
        });            
    }

    checkData=()=>{
        let result = null;      		
          
        firebase.database().ref('result/').on('value', (snapshot)=>{
            result = snapshot.val();
            this.setState({
                result:result,
            })
            this.forceUpdate()
            console.log(this.state.result)
        });

    }

    pushy=async()=>{
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
      
        // only ask if permissions have not already been determined, because
        // iOS won't nec// console.log(snapshot.val());essarily prompt the user a second time.
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
        firebase.database().ref('token/' ).set({
            token:token,
        });
    } 
    
    _handleNotification = (notification) => {
        this.setState({notification: notification});
      };

    

    componentDidMount() {
        this.checkData();
        this.pushy();
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
        
    }

	render() {
        return (
            <ImageBackground source={img} style={{width: '100%', height: '100%',}}>
                 {/* ImageBackground    */}
                <View style={styles.container}>
                    <View style={styles.divide}>
                        {/* <KeyboardAvoidingView> */}
                            <View style={styles.header}>
                                    <Text style={[styles.headerText,{padding:15,color:'#ffffff',fontSize:52}]}>Input</Text>
                            </View>
                            {/* input area */}
                            <View style={styles.body}>
                                {/* body area */}
                                <View style={styles.inputPadding}>
                                    <TextInput placeholderTextColor="#C0C0C0"
                                    style={styles.input}
                                    onChangeText={(text)=>this.setState({text})}
                                    placeholderTextColor="#ffffff"
                                    placeholder="Enter a Text"
                                    keyboardType="default"
                                    />
                                </View>
                                    
                                <View style={styles.inputPadding}>
                                    <TextInput placeholderTextColor="#C0C0C0"
                                        style={styles.input}
                                        placeholder="Enter a Number"
                                        placeholderTextColor="#ffffff"
                                        onChangeText={(num)=>this.setState({num})}
                                        keyboardType="number-pad"
                                        />
                                </View>

                                <View style={styles.inputPadding}>
                                    <TouchableOpacity style={styles.submit} onPress={this.writeData}>
                                        <Text style={styles.submitText}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                </View>
                      

                <View style={[styles.divide,{backgroundColor: '#FFFFFF',borderRadius:10,opacity:0.6}]}>
                    {/* Output Area */}
                        <View style={[styles.header,{padding:15}]}>
                            <Text style={styles.headerText}>Output</Text>
                        </View>
                        {/* Space for output */}
                        <View style={{flex:6,alignItems:'center',justifyContent:'center',padding:14}}>
                            <Text style={styles.resultText}>{this.state.result}</Text>
                        </View> 
                   
                </View>
            </View>
        </ImageBackground>    
            
    );
  }
}