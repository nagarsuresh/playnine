"use strict";

var React = require('react');

var AnswerFrame = React.createClass({
    render: function () {
        var me = this;
        var numbers = this.props.selectedNumbers.map(function (number) {
            return (
                <div className="number" onClick={me.props.deselectHandler.bind(null, number)}>{number}</div>
            );
        });

        return (
            <div id="answer-frame">
                <div className="well">
                    {numbers}
                </div>
            </div>
        );
    }
});

module.exports = AnswerFrame;