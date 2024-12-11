import { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { 
    requestForegroundPermissionsAsync, 
    getCurrentPositionAsync, 
    LocationObject, 
    watchPositionAsync,
    LocationAccuracy
} from 'expo-location';
import BackButton from '../components/backButton';
import Constants from 'expo-constants';

export default function Location () {
    
    // constante pra definir uma altura padrão e responsiva na view
    const statusBarHeight = Constants.statusBarHeight;
    const [ location, setLocation ] = useState<LocationObject | null>(null);
    const mapRef = useRef<MapView>(null);

    const requestPermissions = async () => {
        const { granted } = await requestForegroundPermissionsAsync();
        if (granted) {
            const currentPosition = await getCurrentPositionAsync();
            // console.log("Localizacao atual -> ", currentPosition);
            setLocation(currentPosition);
        } 
    }

    useEffect(() => {
        requestPermissions();
    }, []);

    useEffect(() => {
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1
        }, (response) => {
            // console.log("Nova localização! ", response);
            setLocation(response);
            mapRef.current?.animateCamera({
                pitch: 70,
                center: response.coords
            })
        });
    }, []);

    return (
        <View className='flex flex-1 bg-zinc-900'>
            <View className='items-center justify-between'>
                <View className="w-full px-2 my-10 mr-2" style={{ marginTop: statusBarHeight + 15}}>
                    <BackButton rota='./'/>
                </View>
                <View className='flex items-center justify-center ' style={{marginTop: -60}}>
                    <Text className='text-zinc-200 text-4xl'> Localização</Text>
                </View>
                <View
                    style={{
                        width: "89%",
                        height: "83%",
                        borderRadius: 20,
                        overflow: 'hidden', // Garante que o MapView siga o formato arredondado
                        alignSelf: 'center', // Centraliza se necessário
                    }}
                >
                    
                    {
                        location &&
                        <MapView 
                            ref={mapRef}
                            style={{ flex: 1 }}
                            initialRegion={{
                                latitude: location.coords.latitude , 
                                longitude: location.coords.longitude , 
                                latitudeDelta: 0.005, 
                                longitudeDelta: 0.005
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: location.coords.latitude , 
                                    longitude: location.coords.longitude , 
                                }}
                            />

                        </MapView>
                    }
                    
                </View>
            </View>
        </View>
    )
} 