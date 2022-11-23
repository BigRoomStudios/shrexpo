const T = require('prop-types');
const { default: Styled, ...S } = require('styled-components/native');
const { Text } = require('@ui-kitten/components');

const internals = {};

module.exports = ({ label, ...props }) => {

    const { StyledLabel } = internals;

    return <StyledLabel gutterBottom category="label" {...props}>{label}</StyledLabel>;
};

module.exports.propTypes = {
    label: T.string,
    gutterBottom: T.bool
};

internals.StyledLabel = Styled(Text)`
    ${({ gutterBottom, theme }) => {

        if (gutterBottom) {
            return S.css`
                margin-bottom: ${theme.spacing(1)}px;
            `;
        }
    }}

    font-size: 14px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.palette.basic[600]};
`;
