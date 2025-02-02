import Colors from '@/constants/Colors';
import { Text, TextProps } from '../organisms/Themed';
import { useColorScheme } from 'react-native';

interface ITextProps extends TextProps {
  bold?: boolean;
  color?: string;
}

export function SimpleText(props: ITextProps) {
  const colorScheme = useColorScheme();
  return <Text {...props} testID='simple-text' style={[{ fontFamily: props.bold ? 'SpaceMonoBold' : 'SpaceMono', color: props.color ?? Colors[colorScheme ?? 'light'].text }, props.style]} />;
}
