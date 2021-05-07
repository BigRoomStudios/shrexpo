'use strict';

const { default: Styled } = require('styled-components');

exports.Text = Styled.Text`
    font-size: ${({ theme }) => theme.spacing(1)}px;
    color: ${({ theme }) => theme.palette.etch.shade(100)};
`;
