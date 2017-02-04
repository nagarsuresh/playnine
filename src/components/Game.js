"use strict";

var React = require('react');
var AnswerFrame = require('./AnswerFrame');
var ButtonFrame = require('./ButtonFrame');
var DoneFrame = require('./DoneFrame');
var NumbersFrame = require('./NumbersFrame');
var StarsFrame = require('./StarsFrame');
 
var possibleCombinationSum = function (arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize);
    for (var i = 1; i < combinationsCount; i++) {
        var combinationSum = 0;
        for (var j = 0; j < listSize; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};



var Game = React.createClass({

    getRandomNumber: function () {
        return Math.floor(Math.random() * 9) + 1;
           },

    getInitialState: function () {
        return {
            numberOfStars: this.getRandomNumber(),
            selectedNumbers: [],
            correct: null,
            usedNumbers: [],
            redraws: 5,
            doneStatus: null
        };
    },

    selectHandler: function (number) {
        if (this.state.selectedNumbers.indexOf(number) < 0 && this.state.usedNumbers.indexOf(number) < 0) {
            this.state.selectedNumbers.push(number);
            this.setState({
                selectedNumbers: this.state.selectedNumbers,
                correct: null
            });
        }
    },

    deselectHandler: function (number) {
        var selectedNumbers = this.state.selectedNumbers;
        var indexOf = selectedNumbers.indexOf(number);
        selectedNumbers.splice(indexOf, 1);
        this.setState({
            selectedNumbers: selectedNumbers,
            correct: null
        });
    },
    sumOfSelectedNumbers: function () {
        return this.state.selectedNumbers.reduce(function (p, n) {
            return p + n;
        });
    },

    checkAnswer: function () {
        var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
        this.setState({
            correct: correct
        });
    },

    acceptAnswer: function () {
        var usedNumbers = this.state.usedNumbers;
        usedNumbers = usedNumbers.concat(this.state.selectedNumbers);

        this.setState({
            usedNumbers: usedNumbers,
            correct: null,
            selectedNumbers: [],
            numberOfStars: this.getRandomNumber()
        }, this.updateDoneStatus);
    },

    redrawHandler: function () {
        if (this.state.redraws > 0) {
            this.setState({
                redraws: this.state.redraws - 1,
                selectedNumbers: [],
                correct: null,
                numberOfStars: this.getRandomNumber()
            }, this.updateDoneStatus);
        }
    },

    hasPossibleSolution: function () {
        var usedNumbers = this.state.usedNumbers;
        var numberOfStars = this.state.numberOfStars;
        var possibleNumbers = [];

        for (var i = 0; i <= 9; i++) {
            if (usedNumbers.indexOf(i) < 0) {
                possibleNumbers.push(i);
            }
        }

        return possibleCombinationSum(possibleNumbers, numberOfStars);

    },

    updateDoneStatus: function () {
        if (this.state.usedNumbers.length === 9) {
            this.setState({
                doneStatus: 'You did it!'
            });
            return;
        }

        if (this.state.redraws === 0 && !this.hasPossibleSolution()) {
            this.setState({
                doneStatus: 'Game Over'
            });
        }
    },

    playAgain: function () {
        this.replaceState(this.getInitialState());
    },

    render: function () {
        var selectedNumbers = this.state.selectedNumbers;
        var numberOfStars = this.state.numberOfStars;
        var correct = this.state.correct;
        var usedNumbers = this.state.usedNumbers;
        var redraws = this.state.redraws;
        var doneStatus = this.state.doneStatus;
        var bottomFrame;

        if (doneStatus) {
            bottomFrame = <DoneFrame doneStatus={doneStatus} playAgain={this.playAgain}/>;
        } else {
            bottomFrame = <NumbersFrame selectedNumbers={selectedNumbers} selectHandler={this.selectHandler} usedNumbers={usedNumbers}/>;
        }

        return (
            <div id="game_container" className="container">
                <h1>Play Nine</h1>
                <hr/>
                <div className="clearfix">
                    <StarsFrame numberOfStars={numberOfStars}/>
                    <ButtonFrame selectedNumbers={selectedNumbers}
                        correct={correct}
                        checkAnswer={this.checkAnswer}
                        acceptAnswer={this.acceptAnswer}
                        redraws = {redraws}
                        redraw = {this.redrawHandler}
                        />
                    <AnswerFrame selectedNumbers={selectedNumbers} deselectHandler={this.deselectHandler}/>
                </div>

                {bottomFrame}

            </div>
        );
    }
});


module.exports = Game;       