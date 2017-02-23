import React, { Component } from 'react';
import { Card, Text, InputGroup, Input, Button } from 'native-base';

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