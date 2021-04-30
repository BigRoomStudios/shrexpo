'use strict';

const React = require('react');
const { Image } = require('react-native');
const { default: Styled } = require('styled-components/native');
const { Text } = require('components/Typography');
const Duck = require('assets/duck.jpg');

const WelcomeMessage = Styled(Text)`
    margin: ${({ theme }) => theme.spacing(4)}px auto;
    font-size: ${({ theme }) => theme.spacing(2)}px
`;

const Ducky = Styled(Image)`
    margin: auto;
`;

module.exports = function Home() {

    return (
        <>
            <WelcomeMessage>Welcome!</WelcomeMessage>
            <Ducky
                alt='This is a duck, because Redux!'
                source={Duck}
            />
        </>
    );
};
