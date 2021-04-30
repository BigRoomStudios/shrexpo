const React = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { View, Image, Button } = require('react-native');
const { Text } = require('components/Type');
const Duck = require('../../../assets/duck.jpg');
const WelcomeMessage = Styled(Text)`
    margin: ${({ theme }) => theme.spacing(4)}px auto;
    font-size: ${({ theme }) => theme.spacing(2)}px
`;

const Ducky = Styled(Image)`
    margin: auto;
`;

const Ducky = Styled(Image)`
    margin: ${({ theme }) => theme.spacing(2)}px auto;
`;

const WelcomeText = Styled(Text)`
    margin: auto;
`;

module.exports = function Home({ navigation }) {

    return <View>
        <Ducky source={Duck} />
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
