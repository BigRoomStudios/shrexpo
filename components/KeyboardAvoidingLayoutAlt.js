const { useRef, useEffect } = require('react');
const T = require('prop-types');
const { Animated } = require('react-native');
const { useKeyboardSize } = require('hooks/use-keyboard-size');
const Theme = require('theme');

const internals = {};

exports.KeyboardAvoidingLayout = function KeyboardAvoidingLayoutAlt({ children }) {

    const keyboardSize = useKeyboardSize();
    const marginAnim = useRef(new Animated.Value(0));

    useEffect(() => {

        Animated.timing(marginAnim.current, {
            toValue: keyboardSize,
            ...Theme.animation.keyboard
        }).start();
    }, [keyboardSize]);

    return (
        <Animated.ScrollView
            bounces={false}
            contentContainerStyle={{ flex: 1 }}
            style={{ flex: 1, marginBottom: marginAnim.current, borderColor: 'red', borderWidth: 3 }}
            keyboardShouldPersistTaps='handled'
        >
            {children}
        </Animated.ScrollView>
    );
};

exports.KeyboardAvoidingLayout.propTypes = {
    children: T.node.isRequired
};


exports.withAltKeyboardAvoidingLayout = function withAltKeyboardAvoidingLayout(Component) {

    const { KeyboardAvoidingLayout } = exports;

    return function KeybaordAvoidingLayout(props) {

        return (
            <KeyboardAvoidingLayout>
                <Component {...props} />
            </KeyboardAvoidingLayout>
        );
    };
};
