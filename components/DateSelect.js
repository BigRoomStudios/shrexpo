const { useState } = require('react');
const { View } = require('react-native');
const T = require('prop-types');
const { Button, Calendar, Divider, Modal } = require('@ui-kitten/components');
const { default: Styled } = require('styled-components');
const { format: Format } = require('date-fns');
const { Text, Label } = require('components/Type');
const Theme = require('theme');
const { useStaged } = require('hooks/use-staged');

const internals = {};

module.exports = function DateRangeSelect({ value, onChange, label, caption, disabled, placeholder, ...props }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stagedDate, setStagedDate] = useStaged(value);

    const {
        PseudoInput,
        PseudoInputText,
        DateContainer,
        DateLayout,
        ButtonWrapper,
        PlaceholderText
    } = internals;

    const handlePressOk = () => {

        onChange(stagedDate);
        setIsModalOpen(false);
    };

    const handlePressCancel = () => {

        setStagedDate(value);
        setIsModalOpen(false);
    };

    return (
        <View>
            <View>
                <Label>{label}</Label>
                <PseudoInput
                    disabled={disabled}
                    onPress={() => setIsModalOpen(true)}
                >
                    {!stagedDate && !!placeholder && <PlaceholderText>{placeholder}</PlaceholderText>}
                    <PseudoInputText disabled={disabled}>{stagedDate && Format(stagedDate, 'P')}</PseudoInputText>
                </PseudoInput>
                {!!caption && caption()}
            </View>
            <Modal
                visible={isModalOpen}
                onBackdropPress={() => setIsModalOpen(false)}
            >
                <DateContainer>
                    <DateLayout>
                        <View>
                            <Calendar
                                date={stagedDate}
                                onSelect={(nextDate) => setStagedDate(nextDate)}
                                {...props}
                            />
                        </View>
                    </DateLayout>
                    <Divider />
                    <ButtonWrapper>
                        <Button
                            appearance='ghost'
                            status='basic'
                            onPress={handlePressCancel}
                            style={{ marginRight: Theme.spacing(1) }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onPress={handlePressOk}
                        >
                            Ok
                        </Button>
                    </ButtonWrapper>
                </DateContainer>
            </Modal>
        </View>
    );
};

internals.DateLayout = Styled.View`
    flex-direction: row;
`;

internals.DateContainer = Styled.View`
    background-color: ${({ theme }) => theme.palette.basic[100]};
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
    border: 2px solid ${({ theme }) => theme.palette.basic[400]};
    overflow: hidden;
`;

internals.ButtonWrapper = Styled.View`
    flex-direction: row;
    padding: ${({ theme }) => theme.spacing(1,2)};
    justify-content: flex-end;
`;

internals.PseudoInput = Styled.Pressable`
    flex-direction: row;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(1)}px;
    background-color: #eee;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.palette.basic[400]};
    min-height: 40px;
`;

internals.PseudoInputText = Styled(Text)`
    color: ${({ disabled, theme }) => (disabled ? theme.palette.basic[600] : 'black')};
`;

internals.PlaceholderText = Styled(Text)`
    color: ${({ theme }) => theme.palette.basic[600]};
`;

module.exports.propTypes = {
    value: T.instanceOf(Date),
    onChange: T.func.isRequired,
    label: T.string,
    caption: T.func,
    disabled: T.bool,
    placeholder: T.string
};

module.exports.defaultProps = {
    label: 'Date'
};
