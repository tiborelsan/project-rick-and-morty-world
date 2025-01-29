import Colors from '@/constants/Colors';
import React from 'react';
import { TextInput, TextInputProps, useColorScheme } from 'react-native';

export function SimpleInput(props: TextInputProps) {
    const colorScheme = useColorScheme();
    return  <TextInput {...props}
                style={[{ fontFamily: 'SpaceMono', color: Colors[colorScheme ?? 'light'].textLight }, props.style]}
            />;
}
