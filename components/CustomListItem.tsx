import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../Screens/firebase'

const temp: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpiAvkk5ghcWyvOo7rY_OHEck0iLCl-IgZog&usqp=CAU'

const CustomListItem: FC<any> = ({id, chatName, enterChat}) => {
    const [chatMessages, setChatMessages] = useState<any[]>([])

    useEffect(() => {
        const unsubscribe = db.collection('chats').doc(id)
        .collection('messages').orderBy('timeStamp', 'desc')
        .onSnapshot(snapshot => setChatMessages(
            snapshot.docs.map(doc => doc.data())
        ))
        return unsubscribe
    }, [])

    return (
        <ListItem key={id} bottomDivider onPress={_=>enterChat(id, chatName)} >
            <Avatar rounded source={{uri: chatMessages?.[0]?.photoURL || temp}} />

            <ListItem.Content>
                <ListItem.Title style={{fontWeight: '800'}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail' >
                    {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
