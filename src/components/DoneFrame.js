"use strict";

var React = require('react');
var DoneFrame = React.createClass({

    render: function () {
        return (
            <div id="done-frame" className="well text-center ">
                <h2>{this.props.doneStatus}</h2>
                <button className="btn btn-default" onClick={this.props.playAgain}>Play Again!</button>
            </div>
        );
    }
});

module.exports = DoneFrame;