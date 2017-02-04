"use strict";

var React = require('react');

var NumbersFrame = React.createClass({

    render: function () {
        var numbers = [];
        for (var i = 1; i <= 9; i++) {
            var className = "number selected-" + ((this.props.selectedNumbers.indexOf(i) >= 0) ? 'true' : 'false');
            className += ' used-' + ((this.props.usedNumbers.indexOf(i) >= 0) ? 'true' : 'false');
            numbers.push(
                <div className={className} onClick={this.props.selectHandler.bind(null, i)}>{i}</div>
            );
        }
        return (
            <div id="numbers-frame">
                <div className="well">
                    {numbers}
                </div>
            </div>
        );
    }
});

module.exports = NumbersFrame;