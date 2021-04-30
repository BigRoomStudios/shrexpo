const React = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { Image } = require('react-native');
const { Button, Layout, Text } = require('@ui-kitten/components');
const Duck = require('../../../assets/duck.jpg');

const Ducky = Styled(Image)`
    margin: ${({ theme }) => theme.spacing(2)}px auto;
`;

const WelcomeText = Styled(Text)`
    margin: auto auto ${({ theme }) => theme.spacing(1)}px;
`;

const CenteredButton = Styled(Button)`
    margin: auto;
`;

module.exports = function Home({ navigation }) {

    return <Layout>
        <Ducky source={Duck} />
        <WelcomeText>you've been shreked</WelcomeText>
        <CenteredButton onPress={() => navigation.navigate('/demo')}>Go to Demo</CenteredButton>
    </Layout>;
};

module.exports.propTypes = {
    navigation: T.object.isRequired
};
