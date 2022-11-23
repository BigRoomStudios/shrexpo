const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { Text } = require('@ui-kitten/components');

const internals = {};

module.exports = ({ children, ...props }) => {

    const { StyledCaption } = internals;

    return <StyledCaption category='p2' {...props}>{children}</StyledCaption>;
};

module.exports.propTypes = {
    children: T.string
};

internals.StyledCaption = Styled(Text)`
    margin-top: ${({ theme }) => theme.spacing(1)}px;
`;
