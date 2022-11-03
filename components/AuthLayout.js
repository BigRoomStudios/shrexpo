const { View, Image } = require('react-native');
const { default: Styled } = require('styled-components/native');
const { useNavigation, useRoute } = require('@react-navigation/native');
const { Button } = require('@ui-kitten/components');
const { ArrowLeftIcon } = require('utils/icons');
const LogoSrc = require('../assets/shrek.png');
const { useOnline } = require('../hooks/use-online');
const OfflineIndicator = require('../components/OfflineIndicator');

const internals = {};

exports.withAuthLayout = function withAuthLayout(Component) {

    return function Layout(props) {

        const { Logo } = internals;

        const isOnline = useOnline();
        const showOfflineIndicator = !isOnline;

        return (
            <>
                {showOfflineIndicator && <OfflineIndicator />}
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100%'
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            maxWidth: 304
                        }}
                    >
                        <Logo source={LogoSrc} />
                        <Component {...props} />
                    </View>
                </View>
            </>
        );
    };
};

internals.Logo = Styled(Image)`
    width: 209px;
    aspect-ratio: 1.92;
    height: auto;
    margin: 0 auto;
`;
