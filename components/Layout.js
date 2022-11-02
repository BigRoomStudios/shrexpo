const {
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    Platform
} = require('react-native');

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
