const { useState } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { Button, TextInput, View } = require('react-native');
const { CenteredText, H2, getBaseStyles } = require('components/Type');
const { CenteredView } = require('components/Views');
const NoteModal = require('components/NoteModal');
const { Modal } = require('@ui-kitten/components');


const internals = {};

module.exports = function Demo({ counter, increment, double }) {

    const [input, setInput] = useState('');
    const [stagedNote, setStagedNote] = useState('');
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

    const {
        Heading,
        ButtonWrapper,
        Input
    } = internals;

    console.log(isNoteModalOpen);

    return (
        <>
            <View style={{ flex: 1 }}>
                <CenteredView style={{ flex: 1 }}>
                    <Heading>Counter: {counter}</Heading>
                    <ButtonWrapper>
                        <Button
                            title="Add 1"
                            onPress={increment}
                        />
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <Button
                            title="Double"
                            onPress={double}
                        />
                    </ButtonWrapper>
                    <Heading>Type somethin'</Heading>
                    <Input
                        value={input}
                        onChangeText={setInput}
                    />
                    {!!input && <CenteredText>Hey you typed {input}!</CenteredText>}
                    <ButtonWrapper>
                        <Button
                            title="Open modal"
                            onPress={() => setIsNoteModalOpen(true)}
                        />
                    </ButtonWrapper>
                </CenteredView>
            </View>
            <NoteModal
                isEditing={false}
                isVisible={isNoteModalOpen}
                value={stagedNote}
                onChange={setStagedNote}
                onDismissModal={() => setIsNoteModalOpen(false)}
                onPressCancel={() => setIsNoteModalOpen(false)}
                onPressSubmit={() => setIsNoteModalOpen(false)}
            />
        </>
    );
};

module.exports.propTypes = {
    counter: T.number.isRequired,
    double: T.func.isRequired,
    increment: T.func.isRequired
};

internals.Heading = Styled(H2)`
    margin: ${({ theme }) => theme.spacing(2)}px auto;
    font-size: ${({ theme }) => theme.spacing(2)}px;
`;

internals.ButtonWrapper = Styled.View`
    margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`;

internals.Input = Styled(TextInput)`
    ${({ theme }) => getBaseStyles(theme)}
    width: 90%;
    margin: ${({ theme }) => theme.spacing(1)}px auto;
    padding: ${({ theme }) => theme.spacing(1)}px;
    border: 1px solid;
`;
