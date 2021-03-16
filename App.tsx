import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import AddChatScreen from "./Screens/AddChatScreen";
import ChatScreen from "./Screens/ChatScreen";

const { Screen, Navigator } = createStackNavigator();

const globalScreenOptions = {
	headerStyle: { backgroundColor: "#2c6bed" },
	headerTitleStyle: { color: 'white' },
	headerTintColor: 'white'
};

export default function App() {
	return (
		<NavigationContainer>
			<Navigator initialRouteName='Home' screenOptions={globalScreenOptions}>
			{/* <Navigator initialRouteName='AddChat' screenOptions={globalScreenOptions}> */}
				<Screen name="Login" component={LoginScreen} options={{title: "Lets Sign Up."}} />
				<Screen name='Register' component={RegisterScreen} />
				<Screen name='Home' component={HomeScreen} />
				<Screen name='AddChat' component={AddChatScreen} />
				<Screen name='Chat' component={ChatScreen} />
			</Navigator>
			{/* <View style={styles.container}>
				<Text>Hello React Native !!!</Text>
				<StatusBar style="auto" />
			</View> */}
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
