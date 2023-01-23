const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { View } = require('react-native');
const { Button, Text } = require('@ui-kitten/components');

const internals = {};

module.exports = function Protected({ navigation, ...props }) {

    const { CenteredButton, BigText, Wrapper } = internals;

    return (
        <Wrapper {...props}>
            <View>
                <BigText>This page is exclusive to logged-in users.</BigText>
                <CenteredButton onPress={() => navigation.navigate('/demo')}>Go to Demo</CenteredButton>
                <CenteredButton appearance='ghost' onPress={() => navigation.navigate('/login')}>Log Out</CenteredButton>
            </View>
        </Wrapper>
    );
};

module.exports.propTypes = {
    navigation: T.object.isRequired
};

internals.BigText = Styled(Text)`
    font-size: 80px;
    width: 80%;
    max-width: 800px;
    text-align: center;
    margin: 0 auto;
    font-weight: 800;
    color: ${({ theme }) => theme.palette.basic[700]};
    margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

internals.Wrapper = Styled.View`
    justify-content: center;
    height: 100%;
`;

internals.CenteredButton = Styled(Button)`
    margin: ${({ theme }) => theme.spacing(0, 'auto', 2) };
    width: 80%;
    max-width: 400px;
`;
