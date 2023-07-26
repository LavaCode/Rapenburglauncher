import React, { useState, useEffect, useRef } from 'react';
import { 
  SafeAreaView, 
  StatusBar, 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  Image } from 'react-native';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles/AppStyle';
import * as ScreenOrientation from 'expo-screen-orientation';

const App = () => {
  const [urlToOpen, setUrlToOpen] = useState('https://example.com');
  const [modalVisible, setModalVisible] = useState(false);
  const [counter, setCounter] = useState(0);
  const [pincode, setPincode] = useState('');
  const [urlChangeVisible, setUrlChangeVisible] = useState(false)
  const inactivityTimerRef = useRef(null)
  const [orientationIsPortrait, setOrientation]=useState(false)

  useEffect(() => {
    loadStoredURL();
    checkOrientation();
  }, []);

  useEffect(() => {
    checkCounter();
  }, [counter]);

  const checkCounter = () => {
    if (counter == 5) {
      setCounter(0);
      handleOpenModal();
      //set elseif counter > 0 to reset after each press
    } else if (counter == 1) {
      resetInactivityTimer();
    }
  }

  const checkOrientation = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();
    if(orientation == 3 || orientation == 4) {
      setOrientation(false);
    } else {
      setOrientation(true);
    }
  };

  const changeScreenOrientation = async () => {
    if(orientationIsPortrait==true){
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    }
    else if(orientationIsPortrait==false){
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    }
  }

  const toggleOrientation=()=>{
    setOrientation(!orientationIsPortrait);
    changeScreenOrientation();
  }

  //inactivity timer for hidden button
  const resetInactivityTimer = () => {
    if (inactivityTimerRef) {
      clearTimeout(inactivityTimerRef.current)
    }
    inactivityTimerRef.current = setTimeout(() => setCounter(0), 5000);
  };

  const loadStoredURL = async () => {
    try {
      const storedURL = await AsyncStorage.getItem('urlToOpen');
      if (storedURL) {
        setUrlToOpen(storedURL);
      } else {
        // Set a default URL if no URL is stored
        alert('No URL is set yet')
      }
    } catch (error) {
      console.error('Error loading URL from storage:', error);
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setUrlChangeVisible(false);
  };

  const handleChangeURL = async () => {
    await AsyncStorage.setItem('urlToOpen', urlToOpen);
    setUrlChangeVisible(false);
    setModalVisible(false);
  };

  const handlePinInputChange = (pin) => {
    setPincode(pin);
  }

  const handlePinInput = () => {
    if(pincode === '3011') {
      setPincode('');
      setUrlChangeVisible(true);
    } else {
      setPincode('');
    }

  }

  return (
    <View style={styles.view}>
      <StatusBar hidden={true} />
      <SafeAreaView style={styles.safeArea}>
        <WebView
          source={{ uri: urlToOpen }}
        />
        <TouchableOpacity
          style={styles.hiddenButton}
          //for hidden effect onPress
          activeOpacity={0}
          onPress={() => setCounter(counter + 1)}
        >
          <Text style={styles.hiddenButtonText}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleCloseModal}
        statusBarTranslucent={true}
        >
          <View style={styles.centeredView}>
            <View style={styles.logoContainer}>
                <Image
                  style={orientationIsPortrait ? styles.logoPortrait : styles.logoLandscape}
                  source={require(`./assets/logo.png`)}
                />
            </View>
              {!urlChangeVisible ?
              <View style={orientationIsPortrait ? styles.modalViewPortrait : styles.modalViewLandscape}>
                <Text style={orientationIsPortrait ? styles.pinTextPortrait : styles.pinTextLandscape}>Please enter PIN:</Text>
                <TextInput
                  style={orientationIsPortrait ? [styles.textBoxPortrait, styles.pinBoxPortrait] : [styles.textBoxLandscape, styles.pinBoxLandscape]}
                  placeholder="****"
                  secureTextEntry
                  keyboardType="numeric"
                  maxLength={4}
                  min
                  textAlign='center'
                  onChangeText={handlePinInputChange}
                  value={pincode}
                />
                <TouchableOpacity
                  style={orientationIsPortrait ? styles.pinSubmitButtonPortrait : styles.pinSubmitButtonLandscape}
                  onPress={handlePinInput}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={orientationIsPortrait ? [styles.updateUrlButtonPortrait, styles.cancelButton] : [styles.updateUrlButtonLandscape, styles.cancelButton]}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
              :
              <View style={orientationIsPortrait ? styles.modalViewPortrait : styles.modalViewLandscape}>
                <Text style={orientationIsPortrait ? styles.pinTextPortrait : styles.pinTextLandscape}>Please enter URL:</Text>
                <TextInput
                  style={orientationIsPortrait ? styles.textBoxPortrait : styles.textBoxLandscape}
                  placeholder="Enter new URL"
                  onChangeText={(text) => setUrlToOpen(text)}
                  value={urlToOpen}
                />
                <TouchableOpacity style={orientationIsPortrait ? styles.updateUrlButtonPortrait : styles.updateUrlButtonLandscape} onPress={handleChangeURL}>
                  <Text style={styles.buttonText}>Update URL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={orientationIsPortrait ? [styles.updateUrlButtonPortrait, styles.changeOrientationButton] : [styles.updateUrlButtonLandscape, styles.changeOrientationButton]} onPress={toggleOrientation}>
                  <Text style={styles.buttonText}>Change app orientation</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={orientationIsPortrait ? [styles.updateUrlButtonPortrait, styles.cancelButton] : [styles.updateUrlButtonLandscape, styles.cancelButton]}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
              }
            <Text style={orientationIsPortrait ? styles.supportTextPortrait : styles.supportTextLandscape}>For support, please contact us at: support@rapenburgplaza.nl</Text>
            <Text style={orientationIsPortrait ? styles.webTextPortrait : styles.webTextLandscape}>www.rapenburgplaza.nl</Text>
        </View>
      </Modal>
    </View>
  );
};

export default App;
