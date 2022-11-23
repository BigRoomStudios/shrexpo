const T = require('prop-types');
const _ = require('lodash');
const Caption = require('./Caption');
const { useMemo } = require('react');

const internals = {};

exports.renderCaption = function RenderCaption({ name, errors }) {

    const error = useMemo(() => {

        return _.get(errors, name);
    }, [name, errors]);
    return (

        <>
            {!!error && (
                <Caption status='danger'>{internals.getMessageFromError(error)}</Caption>
            )}
        </>
    );
};

exports.renderCaption.propTypes = {
    name: T.string.isRequired,
    errors: T.object.isRequired
};

internals.getMessageFromError = (error) => {

    if (error.message) {
        return error.message;
    }

    if (error.type === 'required') {
        return `${error.ref.name} is required`;
    }
};
