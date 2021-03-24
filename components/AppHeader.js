import React from 'react';
import {Appbar} from 'react-native-paper';

export default function AppHeader({leftIconOnPress, title, rightIconOnPress}) {
  return (
    <Appbar.Header theme={theme}>
      <Appbar.BackAction onPress={leftIconOnPress} />
      <Appbar.Content title={title} />
      <Appbar.Action icon="home-plus" onPress={rightIconOnPress} />
    </Appbar.Header>
  );
}
const theme = {
  colors: {
    primary: '#009387',
  },
};
