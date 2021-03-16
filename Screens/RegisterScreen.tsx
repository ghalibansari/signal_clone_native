import { StatusBar } from 'expo-status-bar'
import React, { FC, useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Text, Input, Button } from 'react-native-elements';
import { auth } from './firebase';

const RegisterScreen: FC<any> = ({navigation}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Login'
        })
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user?.updateProfile({
                displayName: name,
                photoURL: imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpiAvkk5ghcWyvOo7rY_OHEck0iLCl-IgZog&usqp=CAU'
            })
        })
        .catch(err => alert(err.message))
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={{marginBottom: 50}}>
                Register here !!!
            </Text>

            <View style={styles.inputContainer}>
                <Input placeholder='Full Name' autoFocus type='text' value={name} onChangeText={(text: string) => setName(text)} />
                <Input placeholder='Email' type='text' value={email} onChangeText={(text: string) => setEmail(text)} />
                <Input placeholder='Password' type='password' value={password} onChangeText={(text: string) => setPassword(text)} />
                <Input placeholder='Profile Pic URL (optional)' type='text' value={imageUrl} onChangeText={(text: string) => setImageUrl(text)} onSubmitEditing={register} />
            </View>

            <Button title='Register' onPress={register} raised style={styles.button} />

            {/* <View style={{height: 100}} /> */}
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
    }
})
