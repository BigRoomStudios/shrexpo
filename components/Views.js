const T = require('prop-types');
const { TouchableWithoutFeedback, Keyboard } = require('react-native');
const { default: Styled } = require('styled-components');

exports.CenteredView = Styled.View`
    margin: auto 0;
`;

exports.FormView = ({ children }) => {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {children}
        </TouchableWithoutFeedback>
    );
};

exports.FormView.propTypes = { children: T.node };
