import * as React from 'react';
import {StatusBar, View, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

function FocusAwareStatusBar(props, {Pattern}) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}
export default FocusAwareStatusBar;
