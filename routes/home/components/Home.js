const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { Image } = require('react-native');
const { Button, Text } = require('@ui-kitten/components');
const Shrek = require('../../../assets/shrek.png');

const internals = {};

module.exports = function Home({ navigation }) {

    const { WelcomeImage, WelcomeText, CenteredButton } = internals;

    return <>
        <WelcomeImage source={Shrek} />
        <WelcomeText>you've been shreked</WelcomeText>
        <CenteredButton onPress={() => navigation.navigate('/demo')}>Go to Demo</CenteredButton>
        <CenteredButton appearance='ghost' onPress={() => navigation.navigate('/login')}>Log In</CenteredButton>
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
    margin: auto auto ${({ theme }) => theme.spacing(2)}px;
`;

internals.CenteredButton = Styled(Button)`
    margin: auto;
`;
