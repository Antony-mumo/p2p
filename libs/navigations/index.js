import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import AppNavigator from './app-navigator';
import ScreenNavigator from './navigator';


const RootNavigator = createSwitchNavigator(
  {
    Auth: ScreenNavigator,
    App: AppNavigator
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(RootNavigator);