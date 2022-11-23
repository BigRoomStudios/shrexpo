const { useRef, ...React } = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { Pressable, Keyboard } = require('react-native');
const { Select: BaseSelect } = require('@ui-kitten/components');
const { Controller } = require('react-hook-form');
const { default: Icons } = require('@expo/vector-icons/Feather');
const Label = require('./Label');
const { renderCaption } = require('./helpers');

const internals = {};

module.exports = function Select({ name, defaultValue, control, multiSelect, clearable, rules, errors, children, ...props }) {

    const { StyledSelect, ClearButton } = internals;

    const getDisplayValue = (value) => {

        if (!value) {
            return null;
        }

        const options = React.Children.map(children, ({ props: p }) => p.title);
        const indices = [].concat(value).map(({ row }) => row);

        return options.filter((_, i) => indices.includes(i)).join(', ');
    };

    const selectRef = useRef();

    const handleClear = () => {

        selectRef.current?.clear();
    };

    return (
        <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value } }) => (

                <>
                    <StyledSelect
                        onBlur={onBlur}
                        onFocus={() => Keyboard.dismiss()}
                        onSelect={onChange}
                        value={getDisplayValue(value)}
                        selectedIndex={value}
                        caption={() => renderCaption({ name, errors })}
                        ref={selectRef}
                        multiSelect={multiSelect}
                        accessoryRight={!multiSelect && clearable && value && <ClearButton onPress={handleClear} />}
                        {...props}
                    >
                        {children}
                    </StyledSelect>
                </>
            )}
        />
    );
};

module.exports.propTypes = {
    name: T.string.isRequired,
    control: T.object.isRequired,
    errors: T.object.isRequired,
    label: T.string,
    defaultValue: T.array,
    rules: T.object,
    children: T.any,
    gutterBottom: T.bool,
    selectedIndex: T.array,
    clearable: T.bool,
    multiSelect: T.bool
};

internals.StyledSelect = Styled(BaseSelect).attrs(({ label }) => ({
    label: () => (label ? Label({ label }) : null)
}))`
    margin-bottom: ${({ theme, gutterBottom }) => (gutterBottom ? theme.spacing(3) : 0)}px;
`;

internals.ClearButton = ({ onPress }) => {

    return (
        <Pressable
            hitSlop={16}
            onPress={onPress}
        >
            <Icons name='delete' size={20} color='red' />
        </Pressable>
    );
};

internals.ClearButton.propTypes = {
    onPress: T.func.isRequired
};
