const React = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { Button } = require('react-native');
const { Text } = require('components/Type');

const CenteredView = Styled.View`
    margin: auto;
`;

const Counter = Styled(Text)`
    margin: ${({ theme }) => theme.spacing(2)}px auto;
    font-size: ${({ theme }) => theme.spacing(1.5)}px;
`;

const ButtonWrapper = Styled.View`
    margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`;

module.exports = function Demo({ counter, increment, double }) {

    return (
        <CenteredView>
            <Counter>Counter: {counter}</Counter>
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
        </CenteredView>
    );
};

module.exports.propTypes = {
    counter: T.number.isRequired,
    double: T.func.isRequired,
    increment: T.func.isRequired
};
