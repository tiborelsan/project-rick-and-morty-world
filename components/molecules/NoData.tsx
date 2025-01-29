import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions } from 'react-native';

export function NoData() {
    return <LottieView
            autoPlay={true}
            loop={true}
            style={{
                width: Dimensions.get('window').width - 50,
                height: Dimensions.get('window').width - 50
            }}
            source={require('../../assets/lottie/no_data.json')}
        />;
}
