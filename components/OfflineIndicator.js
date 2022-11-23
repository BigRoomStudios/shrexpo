const { default: Styled } = require('styled-components');
const { useSafeAreaInsets } = require('react-native-safe-area-context');
const { default: Icons } = require('@expo/vector-icons/Feather');
const { Text } = require('components/Type');
const Theme = require('theme');

const internals = {};

module.exports = function OfflineIndicator(props) {

    const {
        BannerContainer,
        BannerText
    } = internals;

    const insets = useSafeAreaInsets();

    return (
        <BannerContainer $insets={insets.top} {...props}>
            <Icons name='alert-triangle' style={{ marginRight: Theme.spacing(1) }}/>
            <BannerText>Check network connection</BannerText>
        </BannerContainer>
    );
};

internals.BannerContainer = Styled.View`
    position: absolute;
    min-width: 250px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    align-self: center;
    padding: ${({ theme }) => theme.spacing(1)}px;
    padding-top: ${({ $insets, theme }) => {

        if ($insets) {
            return $insets + theme.spacing(1);
        }

        return theme.spacing(1);
    }}px;
    background-color: ${({ theme }) => theme.palette.warning};
    z-index: 1;
    border-bottom-right-radius: ${({ theme }) => theme.shape.borderRadius}px;
    border-bottom-left-radius: ${({ theme }) => theme.shape.borderRadius}px;
`;

internals.BannerText = Styled(Text)``;

module.exports.propTypes = {};
