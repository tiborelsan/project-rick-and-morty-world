import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions } from 'react-native';

export function SimpleLoading() {
    return <LottieView
            autoPlay={true}
            loop={true}
            style={{
                width: Dimensions.get('window').width / 2,
                height: Dimensions.get('window').width / 2
            }}
            source={require('../../assets/lottie/loading.json')}
        />;
}
