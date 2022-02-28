'use strict';

const { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Keyboard } = require('react-native');
const { default: Styled } = require('styled-components/native');

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
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                <ScrollView onPress={Keyboard.dismiss}>
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};
