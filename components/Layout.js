const React = require('react');
const {
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    Platform
} = require('react-native');

module.exports = function Layout(Component) {

    return (props) => {

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
