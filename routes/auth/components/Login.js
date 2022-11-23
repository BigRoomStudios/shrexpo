const { useState, useRef } = require('react');
const { useForm } = require('react-hook-form');
const { Pressable } = require('react-native');
const T = require('prop-types');
const { default: Styled } = require('styled-components/native');
const { Feather: Icons } = require('@expo/vector-icons');
const { Button } = require('@ui-kitten/components');
const { Link, Text } = require('../../../components/Type');
const Input = require('../../../components/Form/Input');
const IsEmail = require('../../../utils/is-email');
const Theme = require('theme');

const internals = {};

module.exports = function Login({ onSubmit, error }) {

    const [canShowEmailError, setCanShowEmailError] = useState(false);
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const { control, watch, handleSubmit, formState: { errors } } = useForm();
    const fieldProps = { control, errors };

    const toggleIsSecureEntry = () => setIsSecureTextEntry(!isSecureTextEntry);

    const emailWatch = watch('email');
    const passwordWatch = watch('password');

    const renderIcon = (style, props) => {

        const { tintColor, ...styleProps } = style;

        return <Pressable onPress={toggleIsSecureEntry} hitSlop={Theme.spacing(2)}>
            <Icons
                {...props}
                name={isSecureTextEntry ? 'eye' : 'eye-off'}
                color={tintColor || Theme.palette.basic[800]}
                size={20}
                style={styleProps}
            />
        </Pressable>;
    };

    const renderCaption = () => {

        const { CaptionContainer } = internals;

        return (
            <CaptionContainer>
                <Icons
                    name='alert-circle'
                    color={Theme.palette.danger[400]}
                    size={Theme.spacing(2)}
                    style={{ marginRight: Theme.spacing(1) }}
                />
                <Text status='danger'>Invalid email address</Text>
            </CaptionContainer>
        );
    };

    const { Heading, ButtonWrapper } = internals;

    return (
        <>
            <Heading/>
            <Input
                gutterBottom
                ref={emailRef}
                name='email'
                label='Email'
                autoCompleteType='email'
                textContentType='emailAddress'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
                onSubmitEditing={() => passwordRef.current.focus()}
                blurOnSubmit={false}
                onBlur={() => emailWatch && setCanShowEmailError(true)}
                onFocus={() => setCanShowEmailError(false)}
                caption={emailWatch && canShowEmailError && !IsEmail(emailWatch) && renderCaption}
                {...fieldProps}
            />
            <Input
                gutterBottom
                ref={passwordRef}
                name='password'
                label='Password'
                autoCompleteType='password'
                textContentType='password'
                secureTextEntry={isSecureTextEntry}
                onSubmitEditing={handleSubmit(onSubmit)}
                accessoryRight={renderIcon}
                {...fieldProps}
            />
            {!!error && <Text status='danger'>{error}</Text>}
            <Link status='basic' underline to='forgot-password' navigationArgs={{ email: emailWatch }}>Forgot password?</Link>
            <ButtonWrapper>
                <Button
                    onPress={handleSubmit(onSubmit)}
                    disabled={!emailWatch || !passwordWatch || !IsEmail(emailWatch)}
                >
                    Log in
                </Button>
            </ButtonWrapper>
        </>
    );
};

module.exports.propTypes = {
    navigation: T.object.isRequired,
    onSubmit: T.func.isRequired,
    error: T.string
};

internals.Heading = Styled.View`
    margin-bottom: ${({ theme }) => theme.spacing(6)}px
`;

internals.ButtonWrapper = Styled.View`
    margin: ${({ theme }) => theme.spacing(4, 0)};
`;

internals.CaptionContainer = Styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: ${({ theme }) => theme.spacing(1)}px;
`;
