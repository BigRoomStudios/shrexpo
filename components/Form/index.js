const T = require('prop-types');
const { KeyboardAwareScrollView } = require('react-native-keyboard-aware-scroll-view');
const { default: Styled } = require('styled-components/native');

const internals = {};

module.exports = function Form({ isDirty, onSubmit, submitLabel, children, disabled, ...props }) {

    const { Container } = internals;

    return (
        <Container {...props} keyboardShouldPersistTaps='handled'>
            {children}
        </Container>
    );
};

module.exports.propTypes = {
    children: T.any.isRequired,
    onSubmit: T.func,
    isDirty: T.bool,
    disabled: T.bool,
    submitLabel: T.string
};

module.exports.defaultProps = {
    isDirty: false,
    disabled: false,
    submitLabel: 'Save Changes'
};

internals.Container = Styled.ScrollView`

`;
