import React, { FC, useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import { auth } from './firebase';

const uri = 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png'

const LoginScreen: FC<any> = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => authUser && navigation.replace('Home'))
        return unsubscribe
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .catch(err => alert(err.message))
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />
            <Image source={{uri}} style={{width: 200, height: 200}} />
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Email'
                    type="email"
                    autoFocus
                    value={email}
                    onChangeText={(text: string) => setEmail(text)}
                />

                <Input
                    placeholder='Password'
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text: string) => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>

            <Button title='Login' containerStyle={styles.button} onPress={signIn} />
            <Button title='Register' onPress={()=>navigation.navigate('Register')} type='outline' containerStyle={styles.button} />
            <View style={{height: 100}} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300
    },
})
