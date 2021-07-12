const React = require('react');
const { useState } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { Button, TextInput } = require('react-native');
const { CenteredText, H2, getBaseStyles } = require('components/Type');
const { CenteredView, FormView } = require('components/Views');

const Heading = Styled(H2)`
    margin: ${({ theme }) => theme.spacing(5, 'auto')};
    font-size: ${({ theme }) => theme.spacing(3)}px;
`;

const ButtonWrapper = Styled.View`
    margin-bottom: ${({ theme }) => theme.spacing(4)}px;
`;

const Input = Styled(TextInput)`
    ${({ theme }) => getBaseStyles(theme)}
    width: 90%;
    margin: ${({ theme }) => theme.spacing(4, 'auto')};
    padding: ${({ theme }) => theme.spacing(4)}px;
    border: 1px solid;
`;

module.exports = function Demo({ counter, increment, double }) {

    const [input, setInput] = useState('');

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
