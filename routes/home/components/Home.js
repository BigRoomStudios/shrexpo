const React = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { Image } = require('react-native');
const { Button, Text } = require('@ui-kitten/components');
const Shrek = require('../../../assets/shrek.png');

const internals = {};
    margin: ${({ theme }) => theme.spacing('auto', 'auto', 1)};
`;

const CenteredButton = Styled(Button)`

module.exports = function Home({ navigation }) {

    const { WelcomeImage, WelcomeText } = internals;

        <WelcomeImage source={Shrek} />
        <WelcomeText>you've been shreked</WelcomeText>
        <CenteredButton onPress={() => navigation.navigate('/demo')}>Go to Demo</CenteredButton>
    </>;
};

module.exports.propTypes = {
    navigation: T.object.isRequired
};

internals.WelcomeImage = Styled(Image)`
    width: 100%;
    height: auto;
    aspect-ratio: 1.12;
    margin: ${({ theme }) => theme.spacing(2)}px auto;
`;

internals.WelcomeText = Styled(Text)`
    margin: auto;
`;
