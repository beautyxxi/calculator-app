import React, { Component } from 'react';
import ACTIONS from '../../../redux/actions';
import { connect } from 'react-redux';

//点下按钮，output多一位
class DigitButton extends Component {
    state = {  } 

    render() { 
        return (
            <button onClick={() => this.props.add_digit(this.props.digit)}> 
                {this.props.digit}
            </button>
        );
    }
}

const mapDispatchToProps = {
    add_digit: digit => {
        return{
            type: ACTIONS.ADD_DIGIT,
            digit: digit,
        }
    }
}

export default connect(null, mapDispatchToProps)(DigitButton);