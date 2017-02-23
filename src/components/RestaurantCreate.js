import React, { Component } from 'react';
import { Card, Text, InputGroup, Input, Button } from 'native-base';

import GOOGLE_PLACES_API_KEY from '../../secrets/GOOGLE_PLACES_API_KEY';

class RestaurantCreate extends Component {
  render() {
    return(
      <Card>
        <InputGroup>
          <Input placeholder="Search" />
        </InputGroup>
      </Card>
    );
  };
};

export default RestaurantCreate;