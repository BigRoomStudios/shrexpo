const React = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { Input } = require('@ui-kitten/components');
const { Controller } = require('react-hook-form');
const Label = require('./Label');
const { renderCaption } = require('./helpers');

const internals = {};

module.exports = React.forwardRef(({ name, defaultValue, control, rules, errors, type, convertInput, ...props }, ref) => {

    const { StyledInput, decimalTextChange } = internals;

    return (
        <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value } }) => (

                <StyledInput
                    onBlur={onBlur}
                    onChangeText={(inputValue) => {

                        if (!!convertInput) {
                            onChange(convertInput(inputValue));
                        }
                        else if (type === 'decimal') {
                            onChange(decimalTextChange(inputValue));
                        }
                        else {
                            onChange(inputValue);
                        }
                    }}
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
    gutterBottom: T.bool,
    type: T.string,
    convertInput: T.func
};

internals.StyledInput = Styled(Input).attrs(({ label, textStyle, multiline }) => ({
    label: () => (label ? Label({ label }) : null),
    textStyle: {
        ...textStyle
    }
}))`
    margin-bottom: ${({ theme, gutterBottom }) => (gutterBottom ? theme.spacing(3) : 0)}px;
`;

internals.decimalTextChange = (value) => {

    if (!value || typeof value !== 'string') {
        return null;
    }

    // Remove all characters except digits, . and -
    value = value.replace(/[^\d.-]/g, '');

    // Split input value by .
    const splitValue = value.split('.');

    // Compose number and limit it to 2 decimal places
    value = splitValue.shift() + (splitValue.length ? '.' + splitValue[0].slice(0, 2) : '');

    // Remove all - after first one
    for (let i = 1; i < value.length; ++i) {
        const char = value.substr(i,1);
        if (char === '-') {
            value = value.substr(0,i) + value.substr(i + 1);
            i--;
        }
    }

    value = value.replace(/^(-)?0+(?=\d)/,'$1');

    return value;
};
