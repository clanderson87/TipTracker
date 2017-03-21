import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/NBcommon/LoginForm';
import RestaurantList from './components/RestaurantList';
import TipsDashboard from './components/TipsDashboard';
import AddTipForm from './components/AddTipForm';

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
      {/*<Scene key="main">
        <Scene
          key="restaurantList"
          component={RestaurantList}
          title="My Restaurants"
          initial
        />
      </Scene>*/}
      <Scene key="main">
        <Scene
          key="tipsDashboard"
          component={TipsDashboard}
          title="My Tips"
          initial
        />
        <Scene
          key='AddTip'
          component={AddTipForm}
          title="Add Tip"
        />
      </Scene>
    </Router>
  )
};

export default RouterComponent;