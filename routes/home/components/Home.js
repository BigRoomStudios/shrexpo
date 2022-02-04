const React = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { View, Image, Button } = require('react-native');
const { Text } = require('components/Type');
const Shrek = require('../../../assets/shrek.png');

const internals = {};

module.exports = function Home({ navigation }) {

    const { WelcomeImage, WelcomeText } = internals;

    return <View>
        <WelcomeImage source={Shrek} />
        <WelcomeText>you've been shreked</WelcomeText>
        <Button
            title="Go to Demo"
            onPress={() => navigation.navigate('/demo')}
        />
    </View>;
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
