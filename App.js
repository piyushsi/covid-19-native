import * as React from 'react';
import { Component } from 'react';
import { Image, StyleSheet, Button, ScrollView, View, SafeAreaView, Text, Alert, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Axios from 'axios';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNPickerSelect from 'react-native-picker-select';

const Stack = createStackNavigator();

export default function Apps({ navigation }) {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={App} />
				<Stack.Screen name="Covid-India" component={secondScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

class secondScreen extends React.Component {
	constructor() {
		super();
		this.state = { corona: null, state: null, district: null };
	}
	componentDidMount() {
		Axios.get(`https://api.covid19india.org/state_district_wise.json`)
			.then((res) => {
				this.setState({ corona: res });
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<>
				<SafeAreaView style={styles.container}>
					<ScrollView style={styles.container}>
						<TouchableOpacity>
							<Image style={styles.tinyLogo} source={require('./header.jpg')} />
							<Button
								title={
									this.state.district && this.state.district
										? `${this.state.district}`
										: this.state.state && this.state.state
										? `${this.state.state}`
										: 'Waiting for Selection...'
								}
							/>
						</TouchableOpacity>
						{this.state.district && this.state.district ? (
              <View>
                <Text style={styles.title}>
                  {'Total Number of Cases are '+this.state.corona.data[`${this.state.state}`].districtData[`${this.state.district}`]
										.confirmed }
              </Text>
            <Text style={styles.active}>Active:{this.state.corona.data[`${this.state.state}`].districtData[`${this.state.district}`]
										.active}</Text>
            <Text style={styles.deceased}>Deceased:{this.state.corona.data[`${this.state.state}`].districtData[`${this.state.district}`]
										.deceased}</Text>
              </View>
								
							
						) : (
							<>
								<Text style={styles.data}>District:Active/Total</Text>
								<View style={styles.separator} />
								{this.state.state && this.state.state
									? Object.keys(this.state.corona.data[`${this.state.state}`].districtData).map(
											(a) => {
												return (
													<>
														<Button
															title={
																a +
																':' +
																this.state.corona.data[`${this.state.state}`]
																	.districtData[`${a}`].active +
																'/' +
																this.state.corona.data[`${this.state.state}`]
																	.districtData[`${a}`].confirmed
															}
															onPress={() => this.setState({ district: `${a}` })}
														/>
														<View style={styles.separator} />
													</>
												);
											}
									  )
									: console.log('hi')}
							</>
						)}
						<RNPickerSelect
              onValueChange={(value) => this.setState({ state: value, district: null })}
              placeholder = {{ 
                label: "Select Your State Here", 
                value: null, 
              }}
							items={[
								{ label: 'Andaman and Nicobar Islands ', value: 'Andaman and Nicobar Islands ' },
								{ label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
								{ label: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
								{ label: 'Assam', value: 'Assam' },
								{ label: 'Bihar', value: 'Bihar' },
								{ label: 'Chandigarh', value: 'Chandigarh' },
								{ label: 'Chhattisgarh', value: 'Chhattisgarh' },
								{
									label: 'Dadra and Nagar Haveli and Daman and Diu',
									value: 'Dadra and Nagar Haveli and Daman and Diu',
								},
								{ label: 'Delhi', value: 'Delhi' },
								{ label: 'Goa', value: 'Goa' },
								{ label: 'Gujarat', value: 'Gujarat' },
								{ label: 'Haryana', value: 'Haryana' },
								{ label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
								{ label: 'Jammu and Kashmir', value: 'Jammu and Kashmir' },
								{ label: 'Jharkhand', value: 'Jharkhand' },
								{ label: 'Karnataka', value: 'Karnataka' },
								{ label: 'Kerala', value: 'Kerala' },
								{ label: 'Ladakh', value: 'Ladakh' },
								{ label: 'Lakshadweep', value: 'Lakshadweep' },
								{ label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
								{ label: 'Maharashtra', value: 'Maharashtra' },
								{ label: 'Manipur', value: 'Manipur' },
								{ label: 'Meghalaya', value: 'Meghalaya' },
								{ label: 'Mizoram', value: 'Mizoram' },
								{ label: 'Nagaland', value: 'Nagaland' },
								{ label: 'Odisha', value: 'Odisha' },
								{ label: 'Puducherry', value: 'Puducherry' },
								{ label: 'Punjab', value: 'Punjab' },
								{ label: 'Rajasthan', value: 'Rajasthan' },
								{ label: 'Sikkim', value: 'Sikkim' },
								{ label: 'Tamil Nadu', value: 'Tamil Nadu' },
								{ label: 'Telangana', value: 'Telangana' },
								{ label: 'Tripura', value: 'Tripura' },
								{ label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
								{ label: 'Uttarakhand', value: 'Uttarakhand' },
								{ label: 'West Bengal', value: 'West Bengal' },
							]}
						/>

						<Image style={styles.tinyLogo3} source={require('./saftey2.jpg')} />
						<View style={styles.separator} />
					</ScrollView>
				</SafeAreaView>
			</>
		);
	}
}
class App extends React.Component {
	constructor() {
		super();
		this.state = { active: true, address: null, corona: null, location: null };
	}
	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const location = JSON.stringify(position);

				this.setState({ location: location });
			},
			(error) => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
		Axios.get(`https://api.covid19india.org/state_district_wise.json`)
			.then((res) => {
				this.setState({ corona: res });
			})
			.catch((err) => console.log(err));
	}

	displayLocation = (latitude, longitude) => {
		Axios.get(
			`https://us1.locationiq.com/v1/reverse.php?key=8933ef90f0be62&lat=${latitude}&lon=${longitude}&tag=countries&radius=400000&format=json`
		)
			.then((res) => {
				this.setState({ address: res });
			})
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<>
				<SafeAreaView style={styles.container}>
					{this.state.location && this.state.location
						? this.displayLocation(
								this.state.location.split('latitude')[1].split(',')[0].substr(2),
								this.state.location.split('longitude')[1].split(',')[0].substr(2)
						  )
						: console.log('waiting')}
					<View style={styles.container}>
						<TouchableOpacity>
							<Image style={styles.tinyLogo} source={require('./header.jpg')} />
							<Button
								title={
									this.state.address && this.state.address
										? this.state.address.request.response
												.split('state_district')[1]
												.substr(3)
												.split(',')[0]
												.substr(
													0,
													this.state.address.request.response
														.split('state_district')[1]
														.substr(3)
														.split(',')[0].length - 1
												)
										: 'Searching Your District... '
								}
								onPress={() =>
									this.displayLocation(
										this.state.location.split('latitude')[1].split(',')[0].substr(2),
										this.state.location.split('longitude')[1].split(',')[0].substr(2)
									)
								}
							/>
							<View>
								{this.state.address && this.state.address ? (
									<Text style={styles.title}>
										{'Total Number of Cases are '}
										{
											this.state.corona.data[
												`${this.state.address.request.response
													.split('state')[2]
													.substr(3)
													.split(',')[0]
													.substr(
														0,
														this.state.address.request.response
															.split('state')[2]
															.substr(3)
															.split(',')[0].length - 1
													)}`
											].districtData[
												`${this.state.address.request.response
													.split('state_district')[1]
													.substr(3)
													.split(',')[0]
													.substr(
														0,
														this.state.address.request.response
															.split('state_district')[1]
															.substr(3)
															.split(',')[0].length - 1
													)}`
											].confirmed
										}
									</Text>
								) : (
									console.log('nothing')
								)}
								{/* <Button
          title="Press me"
          color="#FA8072"
        >Hi</Button> */}
							</View>
							{/* <Text style={styles.welcome}>Corona Status in Your Location</Text> */}
							{this.state.address && this.state.address ? (
								<Text style={styles.active}>
									{'Active:'}
									{this.state.corona.data[
										`${this.state.address.request.response
											.split('state')[2]
											.substr(3)
											.split(',')[0]
											.substr(
												0,
												this.state.address.request.response
													.split('state')[2]
													.substr(3)
													.split(',')[0].length - 1
											)}`
									].districtData[
										`${this.state.address.request.response
											.split('state_district')[1]
											.substr(3)
											.split(',')[0]
											.substr(
												0,
												this.state.address.request.response
													.split('state_district')[1]
													.substr(3)
													.split(',')[0].length - 1
											)}`
									].active + ' '}
								</Text>
							) : (
								console.log('nothing')
							)}
							{this.state.address && this.state.address ? (
								<Text style={styles.deceased}>
									{'Deceased:'}
									{this.state.corona.data[
										`${this.state.address.request.response
											.split('state')[2]
											.substr(3)
											.split(',')[0]
											.substr(
												0,
												this.state.address.request.response
													.split('state')[2]
													.substr(3)
													.split(',')[0].length - 1
											)}`
									].districtData[
										`${this.state.address.request.response
											.split('state_district')[1]
											.substr(3)
											.split(',')[0]
											.substr(
												0,
												this.state.address.request.response
													.split('state_district')[1]
													.substr(3)
													.split(',')[0].length - 1
											)}`
									].deceased + ' '}
								</Text>
							) : (
								console.log('nothing')
							)}
						</TouchableOpacity>
					</View>
					<Button
						title="Check other Location"
						onPress={() => this.props.navigation.navigate('Covid-India')}
					/>
					<View style={styles.separator} />

					<Image style={styles.tinyLogo2} source={require('./saftey2.jpg')} />
					<View style={styles.separator} />
				</SafeAreaView>
			</>
		);
	}
}

const styles = StyleSheet.create({
	tinyLogo: {
		width: 300,
		height: 120,
	},
	data: {
		flex: 0.15,
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tinyLogo2: {
		width: 330,
		flex: 0.15,
		justifyContent: 'center',
		alignItems: 'center',
  },
  tinyLogo3: {
    width: 330,
    height:60,
		flex: 0.15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	active: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		backgroundColor: 'blue',
		color: 'white',
	},
	deceased: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		backgroundColor: 'red',
		color: 'white',
	},
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
		marginHorizontal: 16,
	},
	title: {
		textAlign: 'center',
		marginVertical: 8,
	},
	fixToText: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	separator: {
		marginVertical: 8,
		borderBottomColor: '#737373',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
});
