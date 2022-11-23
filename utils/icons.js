const { default: Icons } = require('@expo/vector-icons/Feather');
const Types = require('utils/types');

const internals = {};

exports.CloseIcon = ({ style, color, ...props }) => <Icons name='x' size={20} color={color || style.tintColor} {...props} />;

exports.ArrowLeftIcon = ({ style, color, ...props }) => <Icons name='arrow-left' size={16} color={color || style.tintColor} {...props} />;

exports.CloseIcon.propTypes = Types.icon;

exports.ArrowLeftIcon.propTypes = Types.icon;
