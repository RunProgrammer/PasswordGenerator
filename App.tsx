import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import BouncyCheckbox from "react-native-bouncy-checkbox";

// Form validation
import * as Yup from 'yup'
import { Formik } from 'formik';
// YOUTUBE:
const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(10, 'Should be min of 10 characters')
  .max(28, 'Should be max of 28 characters')
  .required('Length is required')
  
})
export default function App() {

  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setupperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+=~`;:}{[]?/><.,';

    if (upperCase) {
      characterList += upperCaseChars
    }
    if (lowerCase) {
      characterList += lowerCaseChars
    }
    if (numbers) {
      characterList += digitChars
    }
    if (symbols) {
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList, passwordLength )

    setPassword(passwordResult)
    setIsPassGenerated(true)
    
  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
    console.log("RUN");
    
  }

  const resetPasswordState = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setupperCase(false)
    setNumbers(false)
    setSymbols(false)
    
    
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>PassWord Generator ⚙️🪄</Text>
          <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={PasswordSchema}
       onSubmit={ values => {
        console.log(values);
        generatePasswordString(+values.passwordLength) 
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length </Text>
            {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>
                {errors.passwordLength}
              </Text>
            )}
            
          </View>
          <TextInput
            style={styles.inputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder="Ex. 10"
            keyboardType='numeric'
            />
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Lowercase</Text>
          <BouncyCheckbox
          disableBuiltInState
          isChecked={lowerCase}
          onPress={() => setLowerCase(!lowerCase)}
          fillColor="#ff5792"
          />
         </View>
         <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Uppercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setupperCase(!upperCase)}
                    fillColor="#ffcc73"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#57d8ff"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Symbols </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#98ff73"
                  />
                </View>
         <View style={styles.formActions}>
          <TouchableOpacity
          disabled={!isValid}
          style={styles.primaryBtn}
          onPress={handleSubmit}
          >
            <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={ () => {
            handleReset();
            resetPasswordState()
          }}
          >
            <Text style={styles.secondaryBtnTxt}>Reset</Text>
          </TouchableOpacity>
         </View>
         </>
       )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            {/* <Text style={styles.subTitle}>Result:</Text> */}
           
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
         <Text style={styles.description}>Long Press to copy</Text>
         <Text style={styles.description}>Made By : RUN</Text>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin:9,
    padding:8,
  },
  title: {
    color:'white', //TODO:change it to black as bg is white,
    fontSize:25,
    marginBottom:15,
    fontWeight:"bold"
  },
 
  description: {
    color: 'gray',
    fontSize:14,
    marginVertical:10,
    marginBottom: 8,
    marginLeft:20,
  },
  heading: {
    fontSize: 16,
    color:'white'
  },
  inputWrapper: {
    marginBottom: 15,
    marginVertical:20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    width:'30%',
    padding:8,
    borderColor:'white',
    borderWidth:2,
    borderRadius:8,
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical:38,
    
  },
  primaryBtn: {
    width: 130,
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 8,
    backgroundColor: 'gray',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    padding:8,

  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius:50,
    marginHorizontal: 8,
    backgroundColor: 'gray',
    textAlign: 'center',
  },
  secondaryBtnTxt: {
    
    color:'white',
    textAlign: 'center',
    marginTop:14
    
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    margin: 14,
    color:'#000'
  },
});