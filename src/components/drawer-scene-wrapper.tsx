import { ReactNode } from 'react';
import { View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useDrawerProgress } from '@react-navigation/drawer';

// Arquivo que faz as estilizações animadas do drawer
export function DrawerSceneWrapper({ children}: { children: ReactNode }) {
    const progress = useDrawerProgress()
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(
                    progress.value, 
                    [0,1], 
                    [1, 0.8],
                    Extrapolation.CLAMP
                ),
            },
            {
                translateX: interpolate(
                    progress.value, 
                    [0,1], 
                    [0, 200], // quando estiver fechado = posição original(0), quando aberto menu = 200 pro lado direito
                    Extrapolation.CLAMP
                ),
            },
            {
                rotateY: interpolate(
                    progress.value, 
                    [0,1], 
                    [0, -20], // quando estiver fechado = posição original(0), quando aberto menu = -25 de rotação
                    Extrapolation.CLAMP
                ) +"deg", // adicionando abreviação de graus
            },
        ],
        borderRadius: 20, 
        overflow: "hidden",
    }))

    return <Animated.View style={[ { flex: 1 }, animatedStyle ]}>{children}</Animated.View>
  
}