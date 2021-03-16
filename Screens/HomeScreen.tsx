import React, { FC, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import { auth, db } from './firebase';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

interface IChat{
    id: string;
    data: {chatName: string}
}

const HomeScreen: FC<any> = ({navigation}) => {
    const [chats, setChats] = useState<IChat[]>([])

    const signOut = ()=>auth.signOut().then(_=>navigation.replace('Login'))

    const enterChat = (id: string, chatName: string) => navigation.navigate('Chat', {id, chatName})

    useState(() => db.collection('chats').onSnapshot(snapshot => (
        setChats(snapshot.docs.map(doc => ({id: doc.id, data: doc.data() as IChat['data']})))
    )))

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => !authUser && navigation.replace('Login'))
        
        navigation.setOptions({
            title: 'Signal',
            headerStyle: { backgroundColor: '#fff'},
            headerTitleStyle: {color: 'black'},
            headerTintColor: 'black',
            headerLeft: () => (
                <View>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
                        <Avatar rounded source={{uri: auth?.currentUser?.photoURL as string}} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 80, marginRight: 20}}>
                    <TouchableOpacity activeOpacity={0.5} >
                        <AntDesign name='camerao' size={24} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('AddChat')} >
                        <SimpleLineIcons name='pencil' size={24} color='black' />
                    </TouchableOpacity>
                </View>
            )
        })

        return unsubscribe
    }, [navigation, auth])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {chats.map(({id, data: {chatName}}) => (<CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})
