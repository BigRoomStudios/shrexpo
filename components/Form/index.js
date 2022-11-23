const T = require('prop-types');
const { ScrollView } = require('react-native');

const internals = {};

module.exports = function Form({ isDirty, onSubmit, submitLabel, children, disabled, ...props }) {

    return (
        <ScrollView {...props} keyboardShouldPersistTaps='handled'>
            {children}
        </ScrollView>
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
