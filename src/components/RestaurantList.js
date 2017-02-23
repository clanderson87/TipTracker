import React, { Component } from 'react';
import { Card, Text } from 'native-base';

class RestaurantList extends Component {
  render() {
    return(
      <Card>
        <Text>Ruby Tuesday</Text>
        <Text>Yolos</Text>
        <Text>Chagos</Text>
        <Text>F. Scotts</Text>
        <Text>The Southern</Text>
      </Card>
    );
  };
};

export default RestaurantList;