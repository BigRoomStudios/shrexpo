const { useState, useEffect } = require('react');
const { Keyboard } = require('react-native');

exports.useKeyboardSize = function useKeyboardSize() {

    const [keyboardSize, setKeyboardSize] = useState(0);
    useEffect(() => {

        const showListener = Keyboard.addListener('keyboardDidShow', (e) => {

            setKeyboardSize(e.endCoordinates.height);
        });
        const hideListener = Keyboard.addListener('keyboardDidHide', () => {

            setKeyboardSize(0);
        });
        return () => {

            showListener.remove();
            hideListener.remove();
        };
    }, []);
    return keyboardSize;
};
