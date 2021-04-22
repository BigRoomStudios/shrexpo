'use strict';

const React = require('react');
const { default: Styled } = require('styled-components/native');
const { View, Image } = require('react-native');
const { Text } = require('components/Type');
const Duck = require('../../../assets/duck.jpg');

const Ducky = Styled(Image)`
    margin: ${({ theme }) => theme.spacing(2)}px auto;
`;

const WelcomeText = Styled(Text)`
    margin: auto;
`;

module.exports = function Home() {

    return <View>
        <Ducky source={Duck} />
        <WelcomeText>you've been shreked</WelcomeText>
    </View>;
};
