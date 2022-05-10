const T = require('prop-types');
const { KeyboardAvoidingView, Platform, ScrollView } = require('react-native');
const { useHeaderHeight } = require('@react-navigation/stack');

const internals = {};

exports.KeyboardAvoidingLayout = function KeyboardAvoidingLayout({ children }) {

    const headerHeight = useHeaderHeight();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={headerHeight}
        >
            <ScrollView
                bounces={false}
                contentContainerStyle={{ flexGrow: 1, flexShrink: 0 }}
                keyboardShouldPersistTaps='handled'
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

exports.KeyboardAvoidingLayout.propTypes = {
    children: T.node.isRequired
};


exports.withKeyboardAvoidingLayout = function withKeyboardAvoidingLayout(Component) {

    const { KeyboardAvoidingLayout } = exports;

    return function KeybaordAvoidingLayout(props) {

        return (
            <KeyboardAvoidingLayout>
                <Component {...props} />
            </KeyboardAvoidingLayout>
        );
    };
};
