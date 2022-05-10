const T = require('prop-types');
const { View, Animated, Dimensions, Keyboard } = require('react-native');
const { default: Styled } = require('styled-components');
const { Text } = require('components/Type');
const { TopNavigation, Modal, Button, Divider } = require('@ui-kitten/components');
const { default: Icons } = require('@expo/vector-icons/Feather');
const Theme = require('theme');
const { useKeyboardSize } = require('hooks/use-keyboard-size');
const { useRef, useEffect } = require('react');

const internals = {};

module.exports = function WidgetModal({
    title,
    isVisible,
    onDismissModal,
    value,
    onChange,
    onPressSubmit,
    onPressCancel,
    children,
    affirmativeLabel,
    shouldDisableSubmit,
    ...props
}) {

    const keyboardSize = useKeyboardSize();
    const marginAnim = useRef(new Animated.Value(0));

    const {
        CloseButton,
        AddButton,
        CancelButton,
        StyledTopNav,
        StyledModal,
        ContentContainer,
        MainContent
    } = internals;

    useEffect(() => {

        Animated.timing(marginAnim.current, {
            toValue: keyboardSize,
            ...Theme.animation.keyboard
        }).start();
    }, [keyboardSize]);

    return (
        <StyledModal
            visible={isVisible}
            backdropStyle={{ backgroundColor: 'rgba(56, 56, 56, 0.5)' }}
            onBackdropPress={() => {

                Keyboard.dismiss();
                onDismissModal();
            }}
            {...props}
        >

            <Animated.ScrollView bounces={false} style={{ flex: 1, marginBottom: marginAnim.current }} keyboardShouldPersistTaps='handled'>
                <StyledTopNav
                    title={() => <Text category='h3' style={{ color: 'white', marginBottom: 0 }}>Hello</Text>}
                    accessoryRight={<CloseButton onPress={onDismissModal} accessoryRight={<Icons color='white' name='x' size={20} />} />}
                />
                <ContentContainer>
                    <MainContent>
                        {children}
                    </MainContent>
                </ContentContainer>
                <Divider />
                <TopNavigation
                    accessoryRight={
                        <View style={{ flexDirection: 'row' }}>
                            <CancelButton onPress={onPressCancel}>CANCEL</CancelButton>
                            <AddButton disabled={shouldDisableSubmit} onPress={onPressSubmit} size='giant'>{affirmativeLabel}</AddButton>
                        </View>
                    }
                />
            </Animated.ScrollView>

        </StyledModal>
    );
};

internals.ContentContainer = Styled.View`
    flex: 1;
    flex-grow: 1;
    background-color: white;
    flex-direction: row;
`;

internals.MainContent = Styled.View`
    flex: 1;
    background-color:#eee;
    padding: ${({ theme }) => theme.spacing(3,2)}px;
`;

internals.StyledButton = Styled(Button).attrs({ appearance: 'outline', size: 'giant' })``;

internals.AddButton = Styled(internals.StyledButton).attrs({ appearance: 'filled' })``;

internals.CancelButton = Styled(internals.StyledButton)`
    margin-right: ${({ theme }) => theme.spacing(2)}px;
`;

internals.CloseButton = Styled(Button).attrs({ appearance: 'ghost' })``;

internals.StyledTopNav = Styled(TopNavigation)`
    background-color: ${({ theme }) => theme.palette.primary[500]};
`;

internals.StyledModal = Styled(Modal)`
    max-height: ${Dimensions.get('window').height - 10}px;
    maxWidth: 352px;
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
    menuItem: T.object.isRequired,
    onDismissModal: T.func.isRequired,
    isVisible: T.bool,
    value: T.string.isRequired,
    onChange: T.func.isRequired,
    onPressSubmit: T.func.isRequired,
    onPressCancel: T.func.isRequired,
    children: T.any,
    title: T.oneOf([T.string, T.func]),
    affirmativeLabel: T.string,
    shouldDisableSubmit: T.bool
};

module.exports.defaultProps = {
    affirmativeLabel: 'CONFIRM'
};
