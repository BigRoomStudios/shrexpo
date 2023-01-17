const T = require('prop-types');
const { default: Styled } = require('styled-components');
const { Spinner } = require('@ui-kitten/components');

const internals = {};

module.exports = ({ status, size, inset, ...props }) => {

    const { Loading } = internals;

    return (
        <Loading $inset={inset} {...props}>
            <Spinner status={status} size={size} />
        </Loading>
    );
};

internals.Loading = Styled.View`
    position: absolute;
    top: ${({ $inset }) => (Array.isArray($inset) ? $inset[0] : $inset)}px;
    left: ${({ $inset }) => (Array.isArray($inset) ? $inset[3] : $inset)}px;
    right: ${({ $inset }) => (Array.isArray($inset) ? $inset[1] : $inset)}px;
    bottom: ${({ $inset }) => (Array.isArray($inset) ? $inset[2] : $inset)}px;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.palette.basic[100]};
`;

module.exports.propTypes = {
    status: T.oneOf(['basic', 'primary', 'success', 'info', 'warning', 'danger', 'control']),
    size: T.oneOf(['tiny', 'small', 'medium', 'large', 'giant']),
    inset: T.oneOfType([T.number, T.arrayOf(T.number)])
};

module.exports.defaultProps = {
    status: 'basic',
    size: 'large',
    inset: 0
};
