const { default: Styled } = require('styled-components/native');
const { Pressable } = require('react-native');
const { PropTypes: T } = require('prop-types');
const { useNavigation } = require('@react-navigation/native');
const { Text } = require('@ui-kitten/components');
const Theme = require('theme');

const getBaseStyles = (theme) => {

    return `
        font-family: 'OpenSans_400Regular';
        font-size: ${theme.spacing(2)}px;
        color: ${theme.palette.etch};
    `;
};

exports.getBaseStyles = getBaseStyles;

exports.Text = Styled.Text`${({ theme }) => getBaseStyles(theme)}`;

exports.CenteredText = Styled.Text`
    ${({ theme }) => getBaseStyles(theme)}
    margin-left: auto;
    margin-right: auto;
`;

exports.H1 = Styled.Text`
    ${({ theme }) => getBaseStyles(theme)}
    margin-bottom: ${({ theme }) => theme.spacing(4)}px;
    font-family: 'OpenSans_700Bold';
    font-size: ${({ theme }) => theme.spacing(4)}px;
    font-weight: bold;
`;

exports.H2 = Styled.Text`
    ${({ theme }) => getBaseStyles(theme)}
    margin-bottom: ${({ theme }) => theme.spacing(3)}px;
    font-family: 'OpenSans_700Bold';
    font-size: ${({ theme }) => theme.spacing(3)}px;
    font-weight: bold;
`;

exports.H3 = Styled.Text`
    ${({ theme }) => getBaseStyles(theme)}
    margin-bottom: ${({ theme }) => theme.spacing(2.4)}px;
    font-family: 'OpenSans_700Bold';
    font-size: ${({ theme }) => theme.spacing(2.4)}px;
    font-weight: bold;
`;

const Link = ({ to, onPress, hitSlop, children, status, underline, disabled, ...props }) => {

    const navigation = useNavigation();
    return (
        <Pressable disabled={disabled} onPress={onPress ? onPress : () => navigation.navigate(to)} hitSlop={hitSlop}>
            <Text
                {...props}
                style={{ textDecorationLine: underline ? 'underline' : 'none', ...props.style }}
                status={disabled ? 'basic' : status}
            >
                {children}
            </Text>
        </Pressable>
    );
};

Link.propTypes = {
    to: T.string,
    children: T.node.isRequired,
    status: T.oneOf(['basic', 'primary', 'success', 'info', 'warning', 'danger', 'control']),
    underline: T.bool,
    hitSlop: T.number,
    onPress: T.func,
    disabled: T.bool,
    style: T.object
};

Link.defaultProps = {
    status: 'info',
    hitSlop: Theme.spacing(2),
    disabled: false
};

exports.Link = Link;
