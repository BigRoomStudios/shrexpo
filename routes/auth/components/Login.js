const { useState, useRef, useEffect } = require('react');
const { useForm } = require('react-hook-form');
const { Pressable } = require('react-native');
const { useIsFocused } = require('@react-navigation/native');
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

    const [email, setEmail] = useState('');
    const [canShowEmailError, setCanShowEmailError] = useState(false);
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
    const [password, setPassword] = useState('');

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const { control, formState: { errors } } = useForm();
    const fieldProps = { control, errors };

    const toggleIsSecureEntry = () => setIsSecureTextEntry(!isSecureTextEntry);

    const isFocused = useIsFocused();

    // TODO: only reset the form after it successfully submits
    useEffect(() => {

        // reset the form
        setEmail('');
        setPassword('');
        setIsSecureTextEntry(true);
        setCanShowEmailError(false);
    }, [isFocused]);

    const renderIcon = (props) => {

        return <Pressable onPress={toggleIsSecureEntry} hitSlop={Theme.spacing(2)}>
            <Icons
                {...props} name={isSecureTextEntry ? 'eye' : 'eye-off'}
                color={Theme.palette.basic[800]}
                size={20}
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
                value={email}
                onChangeText={setEmail}
                autoCompleteType='email'
                textContentType='emailAddress'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
                onSubmitEditing={() => passwordRef.current.focus()}
                blurOnSubmit={false}
                onBlur={() => email && setCanShowEmailError(true)}
                onFocus={() => setCanShowEmailError(false)}
                caption={email && canShowEmailError && !IsEmail(email) && renderCaption}
                {...fieldProps}
            />
            <Input
                gutterBottom
                ref={passwordRef}
                name='password'
                label='Password'
                value={password}
                onChangeText={setPassword}
                autoCompleteType='password'
                textContentType='password'
                secureTextEntry={isSecureTextEntry}
                onSubmitEditing={() => onSubmit({ email, password })}
                accessoryRight={renderIcon}
                {...fieldProps}
            />
            {!!error && <Text status='danger'>{error}</Text>}
            <Link status='basic' underline to='forgot-password'>Forgot password?</Link>
            <ButtonWrapper>
                <Button
                    onPress={() => onSubmit({ email, password })}
                    disabled={!email || !password || !IsEmail(email)}
                    size='giant'
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
