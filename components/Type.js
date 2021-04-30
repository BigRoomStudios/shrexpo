const { default: Styled } = require('styled-components/native');

const getBaseStyles = (theme) => {

    return `
        font-family: 'OpenSans_400Regular';
        font-size: ${theme.spacing(1)}px;
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
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
    font-family: 'OpenSans_700Bold';
    font-size: ${({ theme }) => theme.spacing(2)}px;
    font-weight: bold;
`;

exports.H2 = Styled.Text`
    ${({ theme }) => getBaseStyles(theme)}
    margin-bottom: ${({ theme }) => theme.spacing(1.5)}px;
    font-family: 'OpenSans_700Bold';
    font-size: ${({ theme }) => theme.spacing(1.5)}px;
    font-weight: bold;
`;

exports.H3 = Styled.Text`
    ${({ theme }) => getBaseStyles(theme)}
    margin-bottom: ${({ theme }) => theme.spacing(1.2)}px;
    font-family: 'OpenSans_700Bold';
    font-size: ${({ theme }) => theme.spacing(1.2)}px;
    font-weight: bold;
`;
