import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import LoginForm from './components/NBcommon/LoginForm';
import RestaurantList from './components/RestaurantList';
import TipsDashboard from './components/TipsDashboard';
import AddTipForm from './components/AddTipForm';
import TipDetail from './components/TipDetail';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene 
          key="login"
          component={LoginForm}
          title="Welcome!"
          initial
        />
      </Scene>
      <Scene key="main">
        <Scene
          key="tipsDashboard"
          component={TipsDashboard}
          title="My Tips"
          onRight={() => Actions.restaurantList()}
          rightTitle='rest'
          initial
        />
        <Scene
          key="restaurantList"
          component={RestaurantList}
          title="My Restaurants"
        />
        <Scene
          key='AddTip'
          component={AddTipForm}
          title="Add Tip"
        />
        <Scene
          key='TipDetail'
          component={TipDetail}
          title='Details'
        />
      </Scene>
    </Router>
  )
};

export default RouterComponent;