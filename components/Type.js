'use strict';

const { default: Styled } = require('styled-components/native');

exports.Text = Styled.Text`
    font-family: ${({ theme }) => theme.typography.primary};
    font-size: ${({ theme }) => theme.spacing(1)}px;
    color: ${({ theme }) => theme.palette.etch};
`;

exports.H1 = Styled.Text`
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
    font-family: ${({ theme }) => theme.typography.primary};
    font-size: ${({ theme }) => theme.spacing(2)}px;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.etch};
`;

exports.H2 = Styled.Text`
    margin-bottom: ${({ theme }) => theme.spacing(1.5)}px;
    font-family: ${({ theme }) => theme.typography.primary};
    font-size: ${({ theme }) => theme.spacing(2)}px;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.etch};
`;

exports.H3 = Styled.Text`
    margin-bottom: ${({ theme }) => theme.spacing(1.2)}px;
    font-family: ${({ theme }) => theme.typography.primary};
    font-size: ${({ theme }) => theme.spacing(2)}px;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.etch};
`;