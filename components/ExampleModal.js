const { useRef, useEffect, useState } = require('react');
const T = require('prop-types');
const { View, Animated, Dimensions, Keyboard } = require('react-native');
const { default: Styled } = require('styled-components');
const { TopNavigation, Modal, Button, Divider } = require('@ui-kitten/components');
const { useSafeAreaInsets } = require('react-native-safe-area-context');
const { Text } = require('components/Type');
const Theme = require('theme');
const { CloseIcon } = require('utils/icons');
const { useKeyboardSize } = require('hooks/use-keyboard-size');

const internals = {};

module.exports = function ExampleModal({
    title,
    isVisible,
    onDismissModal,
    onPressSubmit,
    onPressCancel,
    children,
    affirmativeLabel,
    shouldDisableSubmit,
    ...props
}) {

    const insets = useSafeAreaInsets();
    const keyboardSize = useKeyboardSize();
    const isKeyboardOpenRef = useRef(false);
    const marginAnim = useRef(new Animated.Value(0));

    const height = Dimensions.get('window').height;
    const [windowHeight, setWindowHeight] = useState(height);

    const {
        CloseButton,
        AddButton,
        CancelButton,
        StyledTopNav,
        ButtonWrapper,
        StyledModal,
        ContentContainer,
        MainContent,
        Title
    } = internals;

    useEffect(() => {

        Animated.timing(marginAnim.current, {
            toValue: keyboardSize,
            ...Theme.animation.keyboard
        }).start();

    }, [keyboardSize]);

    useEffect(() => {

        const showSubscription = Keyboard.addListener(
            'keyboardDidShow',
            () => {

                isKeyboardOpenRef.current = true;
            }
        );
        const hideSubscription = Keyboard.addListener(
            'keyboardDidHide',
            () => {

                isKeyboardOpenRef.current = false;
            }
        );

        return () => {

            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);


    useEffect(() => {

        const subscription = Dimensions.addEventListener(
            'change',
            ({ window }) => {

                setWindowHeight(window.height);
            }
        );

        return () => subscription?.remove();
    }, []);

    return (
        <StyledModal
            visible={isVisible}
            backdropStyle={{ backgroundColor: 'rgba(56, 56, 56, 0.5)' }}
            onBackdropPress={() => {

                if (isKeyboardOpenRef.current) {
                    Keyboard.dismiss();
                }
                else {
                    onDismissModal();
                }
            }}
            {...props}
            style={{
                maxHeight: windowHeight - insets.top - insets.bottom,
                ...props.style
            }}
        >
            <Animated.ScrollView bounces={false} style={{ marginBottom: marginAnim.current }} keyboardShouldPersistTaps='handled'>
                <View>
                    <StyledTopNav
                        title={() => <Title>{title}</Title>}
                        accessoryRight={<CloseButton onPress={onDismissModal} accessoryRight={<CloseIcon color='white' />} />}
                    />
                    <ContentContainer>
                        <MainContent>
                            {children}
                        </MainContent>
                    </ContentContainer>
                    <Divider />
                    <ButtonWrapper
                        accessoryRight={
                            <View style={{ flexDirection: 'row' }}>
                                <CancelButton onPress={onPressCancel}>CANCEL</CancelButton>
                                <AddButton disabled={shouldDisableSubmit} onPress={onPressSubmit} size='giant'>{affirmativeLabel}</AddButton>
                            </View>
                        }
                    />
                </View>
            </Animated.ScrollView>

        </StyledModal>
    );
};

internals.ContentContainer = Styled.View``;

internals.MainContent = Styled.View`
    background-color: #eee;
    padding: ${({ theme }) => theme.spacing(3, 2)};
`;

internals.StyledButton = Styled(Button).attrs({ appearance: 'outline', size: 'giant' })``;

internals.AddButton = Styled(internals.StyledButton).attrs({ appearance: 'filled' })``;

internals.CancelButton = Styled(internals.StyledButton)`
    margin-right: ${({ theme }) => theme.spacing(2)}px;
`;

internals.CloseButton = Styled(Button).attrs({ appearance: 'ghost' })``;

internals.StyledTopNav = Styled(TopNavigation)`
    background-color: ${({ theme }) => theme.palette.primary};
`;

internals.ButtonWrapper = Styled(TopNavigation)`
    background-color: ${({ theme }) => theme.palette.slate[500]};
`;

internals.Title = Styled(Text).attrs({ category: 'h4' })`
    color: ${({ theme }) => theme.palette.slate[100]};
    font-size: 22px;
    font-weight: 600;
    font-family: 'System';
`;

internals.StyledModal = Styled(Modal)`
    max-width: 352px;
    width: 80%;
    overflow: hidden;
    border-radius: 8px;
`;

internals.Label = Styled(Text).attrs({ category: 's1' })`
    color: blue;
    font-weight: 700;
    margin-bottom: 12px;
`;

module.exports.propTypes = {
    onDismissModal: T.func.isRequired,
    isVisible: T.bool,
    onPressSubmit: T.func.isRequired,
    onPressCancel: T.func.isRequired,
    children: T.any,
    title: T.oneOfType([T.string, T.func]),
    affirmativeLabel: T.string,
    shouldDisableSubmit: T.bool,
    style: T.object
};

module.exports.defaultProps = {
    affirmativeLabel: 'CONFIRM'
};
