const T = require('prop-types');
const { View } = require('react-native');
const { default: Styled } = require('styled-components');
const { Input } = require('@ui-kitten/components');
const { Text } = require('components/Type');
const ExampleModal = require('components/ExampleModal');

const internals = {};

module.exports = function NoteModal({ isVisible, isEditing, onDismissModal, value, onChange, onPressAdd, onPressCancel, ...props }) {

    const { Label } = internals;

    return (
        <ExampleModal
            visible={isVisible}
            title={isEditing ? 'Edit Note' : 'Add Note'}
            affirmativeLabel={isEditing ? 'SAVE' : 'ADD'}
            onPressSubmit={onPressAdd}
            onDismissModal={onDismissModal}
            onPressCancel={onPressCancel}
            {...props}
        >
            <View>
                <Label>Note</Label>
                <Input
                    value={value}
                    onChangeText={onChange}
                    multiline
                    textStyle={{ minHeight: 160 }}
                    gutterBottom
                    name='description'
                    autoCompleteType='off'
                    textContentType='none'
                    blurOnSubmit={false}
                    selectTextOnFocus
                />
            </View>
        </ExampleModal>
    );
};

internals.Label = Styled(Text).attrs({ category: 's1' })`
    color: ${({ theme }) => theme.palette.primary};
    font-weight: 700;
    margin-bottom: 12px;
`;

module.exports.propTypes = {
    onDismissModal: T.func.isRequired,
    isVisible: T.oneOf([true, false, 'editing']),
    isEditing: T.bool,
    value: T.string.isRequired,
    onChange: T.func.isRequired,
    onPressAdd: T.func.isRequired,
    onPressCancel: T.func.isRequired
};

module.exports.defaultProps = {
    isEditing: false
};
