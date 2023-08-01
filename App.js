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
  const [urlChangeVisible, setUrlChangeVisible] = useState(false);
  const inactivityTimerRef = useRef(null);
  const [orientationIsLandscape, setOrientation] = useState(true);

  useEffect(() => {
    loadStoredURL();
    changeScreenOrientation();
  }, []);

  useEffect(() => {
    checkCounter();
  }, [counter]);

  useEffect(() => {
    updateOrientation
  }, [orientationIsLandscape])

  const checkCounter = () => {
    if (counter == 5) {
      setCounter(0);
      handleOpenModal();
    } else if (counter > 0) {
      resetInactivityTimer();
    }
  }

  const changeScreenOrientation = async () => {
    const storedOrientation = await AsyncStorage.getItem('orientation');
    if(storedOrientation == 'landscape') {
      // alert('to portrait');
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
    else if(storedOrientation == 'portrait') {
      // alert('to landscape');
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    } else {
      const currentOrientation = await ScreenOrientation.getOrientationAsync();
      if (currentOrientation == 1 || currentOrientation == 2) {
        setOrientation(false);
      } else if (currentOrientation == 3 || currentOrientation == 4) {
        setOrientation(true);
      }
    }
  }

  const toggleOrientation=()=>{
    setOrientation(!orientationIsLandscape);
    updateOrientation();
  }

  const updateOrientation = async () => {
    if (orientationIsLandscape) {
      try {
        await AsyncStorage.setItem('orientation', 'landscape');
      } catch(e) {
        alert(e);
      }
    } else if (!orientationIsLandscape) {
      try {
        await AsyncStorage.setItem('orientation', 'portrait');
      } catch(e) {
        alert(e);
      }
    }
    changeScreenOrientation();
  }

  //inactivity timer for hidden button
  const resetInactivityTimer = () => {
    if (inactivityTimerRef) {
      clearTimeout(inactivityTimerRef.current)
    }
    inactivityTimerRef.current = setTimeout(() => setCounter(0), 2000);
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
            <View style={orientationIsLandscape ? styles.logoContainerLandscape : styles.logoContainerPortrait}>
                <Image
                  style={styles.logo}
                  source={require(`./assets/logo.png`)}
                />
            </View>
              {!urlChangeVisible ?
              <View style={orientationIsLandscape ? styles.modalViewLandscape : styles.modalViewPortrait}>
                <Text style={orientationIsLandscape ? styles.pinTextLandscape : styles.pinTextPortrait}>Please enter PIN:</Text>
                <TextInput
                  style={orientationIsLandscape ? [styles.textBoxLandscape, styles.pinBoxLandscape] : [styles.textBoxPortrait, styles.pinBoxPortrait]}
                  placeholder="Enter PIN"
                  secureTextEntry
                  keyboardType="numeric"
                  maxLength={4}
                  min
                  textAlign='center'
                  onChangeText={handlePinInputChange}
                  value={pincode}
                />
                <TouchableOpacity
                  style={orientationIsLandscape ? styles.pinSubmitButtonLandscape : styles.pinSubmitButtonPortrait}
                  onPress={handlePinInput}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={orientationIsLandscape ? [styles.updateUrlButtonLandscape, styles.cancelButton] : [styles.updateUrlButtonPortrait, styles.cancelButton]}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
              :
              <View style={orientationIsLandscape ? styles.modalViewLandscape : styles.modalViewPortrait}>
                <Text style={orientationIsLandscape ? styles.pinTextLandscape : styles.pinTextPortrait}>Please enter URL:</Text>
                <TextInput
                  style={orientationIsLandscape ? styles.textBoxLandscape : styles.textBoxPortrait}
                  placeholder="Enter new URL"
                  onChangeText={(text) => setUrlToOpen(text)}
                  value={urlToOpen}
                />
                <TouchableOpacity style={orientationIsLandscape ? styles.updateUrlButtonLandscape : styles.updateUrlButtonPortrait} onPress={handleChangeURL}>
                  <Text style={styles.buttonText}>Update URL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={orientationIsLandscape ? [styles.updateUrlButtonLandscape, styles.changeOrientationButton] : [styles.updateUrlButtonPortrait, styles.changeOrientationButton]} onPress={toggleOrientation}>
                  <Text style={styles.buttonText}>Change app orientation</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={orientationIsLandscape ? [styles.updateUrlButtonLandscape, styles.cancelButton] : [styles.updateUrlButtonPortrait, styles.cancelButton]}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
              }
            <View style={orientationIsLandscape ? styles.supportBoxLandscape : styles.supportBoxPortrait}>
              <Text style={orientationIsLandscape ? styles.supportTextLandscape : styles.supportTextPortrait}>For support, please contact us at: support@rapenburgplaza.nl</Text>
              <Text style={orientationIsLandscape ? styles.webTextLandscape : styles.webTextPortrait}>www.rapenburgplaza.nl</Text>
            </View>
        </View>
      </Modal>
    </View>
  );
};

export default App;
