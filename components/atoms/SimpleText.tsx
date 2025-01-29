import Colors from '@/constants/Colors';
import { Text, TextProps } from '../organisms/Themed';
import { useColorScheme } from 'react-native';

export function SimpleText(props: TextProps) {
  const colorScheme = useColorScheme();
  return <Text {...props} style={{ fontFamily: 'SpaceMono', color: Colors[colorScheme ?? 'light'].textLight }} />;
}
