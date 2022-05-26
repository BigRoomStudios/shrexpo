const { useSelector } = require('react-redux');
const { useMiddleEnd } = require('strange-middle-end');
const Demo = require('../components/Demo');


module.exports = function DemoContainer() {

    const m = useMiddleEnd();
    const counter = useSelector(m.selectors.counter.getValue);
    const handleIncrement = () => m.dispatch.counter.increment({ amount: 1 });
    const handleDouble = () => m.dispatch.counter.double();

    return (
        <Demo
            counter={counter}
            increment={handleIncrement}
            double={handleDouble}
        />
    );
};
