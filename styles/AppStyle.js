import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    hiddenButton: {
        position: 'absolute',
        bottom: 0,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        backgroundColor: 'grey',
        opacity: 0.7,
        borderRadius: 0,
        overflow: 'hidden',
        //for hidden - remove to make visible:
        opacity: 0
    },
    hiddenButtonText: {
        color: 'white', 
        fontSize: 25, 
        //for hidden - remove to make visible:
        opacity: 0
    },
    centeredView: {
        flex: 1,
        justifyContent: 'space-around', 
        alignItems: 'center',
    },  
    modalViewLandscape: {
        borderRadius: 10,
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '60%',
        maxHeight: 200,
        backgroundColor: 'lightgrey',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        width: '40%',
        maxWidth: 500,
        marginBottom: '10%',
        marginTop: '0%',
    },
    modalViewPortrait: {
        borderRadius: 20,
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 300,
        backgroundColor: 'lightgrey',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        width: '60%',
        marginBottom: '50%',
        marginTop: '0%',
    },
    logoContainerLandscape: {
        position: 'absolute',
        left: 25,
        top: 25,
        height: 100,
        width: 100,
    },
    logoContainerPortrait: {
        height: 125,
        width: 125,
    },
    logo: {
        width: 'auto',
        height: '90%',
        opacity: 0.7,
        tintColor: 'red',
        resizeMode: 'contain',
    },
    textBoxLandscape: {
        borderColor: 'gray', 
        backgroundColor: 'white',
        borderWidth: 1.5, 
        paddingHorizontal: 5,
        paddingVertical: 5, 
        marginBottom: 5, 
        width: '80%',
    },
    textBoxPortrait: {
        borderColor: 'gray', 
        backgroundColor: 'white',
        borderWidth: 1.5, 
        padding: 10, 
        marginBottom: 20, 
        width: '90%',
    },
    pinTextLandscape: {
        color: 'black',
        fontWeight: '500',
        marginTop: 0
    },  
    pinTextPortrait: {
        color: 'black',
        fontWeight: '500',
        marginBottom: 10, 
    },  
    pinBoxLandscape: {  
        justifyContent: 'center',
    },
    pinBoxPortrait: {  
        justifyContent: 'center',
    },
    pinSubmitButtonLandscape: {
        padding: 7, 
        marginBottom: 5, 
        width: '80%', 
        backgroundColor: 'darkgrey', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    pinSubmitButtonPortrait: {
        padding: 15, 
        marginBottom: 10, 
        width: '90%', 
        backgroundColor: 'darkgrey', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    updateUrlButtonLandscape: {
        padding: 7, 
        marginBottom: 5, 
        width: '80%', 
        backgroundColor: 'green', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    updateUrlButtonPortrait: {
        padding: 15, 
        marginBottom: 10, 
        width: '90%', 
        backgroundColor: 'green', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    changeOrientationButton: {
        backgroundColor: 'darkblue',
    },
    cancelButton: {
        backgroundColor: 'red', 
    },
    buttonText: {
        color: 'white', 
        fontSize: 16
    },
    supportBoxLandscape: {
        position: 'absolute',
        bottom: 10,
        height: '20%',
        maxHeight: 65,
        justifyContent: 'center',
        alignItems: 'center',
    },
    supportBoxPortrait: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
    },
    supportTextLandscape: {
        width: '80%',
        textAlign: 'center',
        color: 'grey',
        marginBottom: '1%'
    },
    supportTextPortrait: {
        width: '80%',
        textAlign: 'center',
        color: 'grey',
        marginBottom: '10%'
    },
    webTextLandscape: {
        opacity: 0.6,
        color: '#ff726f',
        marginBottom: '0%',
    },
    webTextPortrait: {
        opacity: 0.6,
        color: '#ff726f',
        marginBottom: '2%',
    }
});
export { styles }

