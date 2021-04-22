'use strict';

const React = require('react');
const { View, Text, Image } = require('react-native');
const Duck = require('../../../assets/duck.jpeg');

module.exports = function Home() {

    return <View>
        <Image source={Duck} />
        <Text>Welcome home</Text>
    </View>;
};
