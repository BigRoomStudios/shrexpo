const React = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { Image } = require('react-native');
const { Button, Text } = require('@ui-kitten/components');
const Duck = require('../../../assets/duck.jpg');

const Ducky = Styled(Image)`
    margin: ${({ theme }) => theme.spacing(4)}px auto;
`;

const WelcomeText = Styled(Text)`
    margin: ${({ theme }) => theme.spacing('auto', 'auto', 1)};
`;

const CenteredButton = Styled(Button)`
    margin: auto;
`;

module.exports = function Home({ navigation }) {

    return <>
        <Ducky source={Duck} />
        <WelcomeText>you've been shreked</WelcomeText>
        <CenteredButton onPress={() => navigation.navigate('/demo')}>Go to Demo</CenteredButton>
    </>;
};

module.exports.propTypes = {
    navigation: T.object.isRequired
};
