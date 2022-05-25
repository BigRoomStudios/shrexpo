const { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Keyboard } = require('react-native');
const { default: Styled } = require('styled-components/native');

const Header = Styled.View`
    background: ${({ theme }) => theme.palette.BRAND};
`;

exports.withLayout = function withLayout(Component) {

    return function Layout(props) {

        return (
            <>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView onPress={Keyboard.dismiss}>
                        <Component {...props} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </>
        );
    };
};
