const React = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { Controller } = require('react-hook-form');
const { renderCaption } = require('./helpers');
const DateSelect = require('../DateSelect');

const internals = {};

module.exports = React.forwardRef(({ name, label, defaultValue, control, rules, errors, ...props }, ref) => {

    const { StyledDateSelectInput } = internals;

    return (
        <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            rules={rules}
            render={({ field: { onChange, value } }) => (

                <StyledDateSelectInput
                    label={label}
                    onChange={onChange}
                    value={value}
                    caption={() => renderCaption({ name, errors })}
                    ref={ref}
                    {...props}
                />
            )}
        />
    );
});

module.exports.propTypes = {
    name: T.string.isRequired,
    control: T.object.isRequired,
    errors: T.object.isRequired,
    label: T.string,
    rules: T.object,
    defaultValue: T.string,
    gutterBottom: T.bool
};

internals.StyledDateSelectInput = Styled(DateSelect).attrs(({ textStyle, multiline }) => ({
    textStyle: {
        ...textStyle
    }
}))`
    margin-bottom: ${({ theme, gutterBottom }) => (gutterBottom ? theme.spacing(3) : 0)}px;
`;
