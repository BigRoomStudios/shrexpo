const React = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const {
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    Keyboard,
    Platform
} = require('react-native');


const Header = Styled.View`
    background: ${({ theme }) => theme.palette.BRAND};
`;

const HeaderText = Styled.Text`
    padding: ${({ theme }) => theme.spacing(0.25)}px 0 ${({ theme }) => theme.spacing(1.5)}px;
    font-size: ${({ theme }) => theme.spacing(1.125)}px;
    font-weight: bold;
    text-align: center;
    color: ${({ theme }) => theme.palette.ETCH};
`;

module.exports = function Layout({ children }) {

    return (
        <>
            <Header>
                <SafeAreaView>
                    <HeaderText>shrexpo</HeaderText>
                </SafeAreaView>
            </Header>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView onPress={Keyboard.dismiss}>
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

module.exports.propTypes = {
    children: T.element
};
