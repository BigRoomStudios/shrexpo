const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { Image, View, useWindowDimensions } = require('react-native');
const { Button, Text } = require('@ui-kitten/components');
const Shrek = require('../../../assets/shrek.png');

const internals = {};

module.exports = function Home({ navigation, ...props }) {

    const { WelcomeImage, WelcomeText, CenteredButton } = internals;
    const { height } = useWindowDimensions();

    return (
        <View {...props}>
            <WelcomeImage source={Shrek} style={{ maxHeight: height * .6 }} />
            <WelcomeText>you've been shreked</WelcomeText>
            <CenteredButton onPress={() => navigation.navigate('/demo')}>Go to Demo</CenteredButton>
        </View>
    );
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
    margin: 0 auto ${({ theme }) => theme.spacing(2)}px;
`;

internals.CenteredButton = Styled(Button)`
    margin: ${({ theme }) => theme.spacing(0, 'auto', 2) };
    width: 80%;
    max-width: 400px
`;
