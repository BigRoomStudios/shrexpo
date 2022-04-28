const React = require('react');
const { useState } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { Button, TextInput } = require('react-native');
const { CenteredText, H2, getBaseStyles } = require('components/Type');
const { CenteredView, FormView } = require('components/Views');

const internals = {};

module.exports = function Demo({ counter, increment, double }) {

    const [input, setInput] = useState('');

    const {
        Heading,
        ButtonWrapper,
        Input
    } = internals;

    return (
        <FormView>
            <CenteredView>
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
            </CenteredView>
        </FormView>
    );
};

module.exports.propTypes = {
    counter: T.number.isRequired,
    double: T.func.isRequired,
    increment: T.func.isRequired
};

internals.Heading = Styled(H2)`
    margin: ${({ theme }) => theme.spacing(2)}px auto;
    font-size: ${({ theme }) => theme.spacing(1.5)}px;
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