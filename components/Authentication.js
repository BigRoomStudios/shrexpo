const { useEffect, useRef } = require('react');
const { useMiddleEnd } = require('strange-middle-end');
const { useSelector } = require('react-redux');
const { useIsFocused, useNavigation, useRoute } = require('@react-navigation/native');
const LoadingOverlay = require('components/LoadingOverlay');

exports.withAuthentication = function withAuthentication(Component) {

    const WrappedComponent = function (props) {

        const m = useMiddleEnd();
        const attemptingRef = useRef(false);
        const isAuthenticated = useSelector(m.selectors.auth.getIsAuthenticated);
        const isAuthenticationSettled = useSelector(m.selectors.auth.getHasAuthenticationSettled);
        const navigation = useNavigation();
        const isFocused = useIsFocused();
        const route = useRoute();

        useEffect(() => {

            if (!isAuthenticated && isAuthenticationSettled && isFocused) { // not authenticated, force login
                if (!attemptingRef.current) {
                    attemptingRef.current = true;

                    navigation.navigate(
                        '/login',
                        {
                            prev: route.name
                        }
                    );
                    // navigation.navigate('/login');
                }
                else {
                    attemptingRef.current = false;
                    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('/home');
                }
            }
        }, [isAuthenticated, isAuthenticationSettled, isFocused, navigation, route]);

        if (!isAuthenticationSettled  && !isAuthenticated) { // authenticating from unauthenticated (doesn't cover reauthorizing or fetchCurrentUser calls)
            return (<LoadingOverlay />);
        }

        if (!isAuthenticated) { // unauthenticated or unauthorized, no in-flight attempts to authenticate
            return null; // Otherwise, user sees UI of protected screen for a flash before being redirected by effect
        }

        return (<Component {...props} />);
    };

    WrappedComponent.displayName = `withAuthentication(${Component.displayName || Component.name || 'Component'})`;

    return WrappedComponent;
};
