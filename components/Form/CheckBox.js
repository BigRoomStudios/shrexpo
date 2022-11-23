const React = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { CheckBox } = require('@ui-kitten/components');
const { Controller } = require('react-hook-form');
const { renderCaption } = require('./helpers');

const internals = {};

module.exports = React.forwardRef(({ name, defaultValue, control, rules, errors, onChange, ...props }, ref) => {

    const { StyledCheckBox } = internals;

    return (
        <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            rules={rules}
            render={({ field: { onChange: onChangeBase, onBlur, value } }) => (

                <StyledCheckBox
                    onBlur={onBlur}
                    checked={value}
                    onChange={(nextChecked) => {

                        if (onChange) {
                            onChange(nextChecked);
                        }

                        onChangeBase(nextChecked);
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
    onChange: T.func,
    rules: T.object,
    defaultValue: T.string,
    gutterBottom: T.bool
};

internals.StyledCheckBox = Styled(CheckBox).attrs(({ label, textStyle, multiline }) => ({
    textStyle: {
        ...textStyle
    }
}))`
    margin-bottom: ${({ theme, gutterBottom }) => (gutterBottom ? theme.spacing(3) : 0)}px;
`;
