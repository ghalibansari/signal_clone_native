import React, { ComponentType, FC, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from './firebase'

const AddChatScreen: FC<any> = ({navigation}) => {
    const [input, setInput] = useState('')

    const createChat = async () => await db.collection('chats').add({chatName: input}).then(()=>navigation.goBack()).catch(e=>alert(e.message))

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add new chat',
            headerBackTitle: 'Chats'
        })
    }, [])

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a Chat name."
                value={input}
                onChangeText={(text: string) => setInput(text)}
                leftIcon={<Icon name='wechat' type='antdesign' size={24} color='black'/>}
                onSubmitEditing={createChat}
            />
            <Button disabled={!input} title='Create new chat' onPress={createChat} />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 30,
        height: '100%'
    },
})
