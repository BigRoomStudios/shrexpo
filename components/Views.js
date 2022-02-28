const T = require('prop-types');
const { TouchableWithoutFeedback, Keyboard } = require('react-native');
const { default: Styled } = require('styled-components');

exports.CenteredView = Styled.View`
    width: 100%;
    margin: auto;
`;

exports.FormView = ({ children }) => {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {children}
        </TouchableWithoutFeedback>
    );
};

exports.FormView.propTypes = { children: T.node };
