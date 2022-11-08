const {
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    Platform
} = require('react-native');
const { useSafeAreaInsets } = require('react-native-safe-area-context');


exports.withLayout = function withLayout(Component) {

    return function Layout(props) {

        const insets = useSafeAreaInsets();

        return (
            <>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView onPress={Keyboard.dismiss}>
                        <Component {...props} style={{ paddingBottom: insets.bottom }} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </>
        );
    };
};
