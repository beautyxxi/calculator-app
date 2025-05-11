// import { current } from "@reduxjs/toolkit";
import ACTIONS from "./actions";

const evaluate = state => {
    //解构不能随便起名
    let {lastOperand, currentOperand, operation} = state;
    let last = parseFloat(lastOperand);
    let current = parseFloat(currentOperand);

    console.log(last, current, operation);

    let res = "";
    switch(operation) {
        case '+':
            res = last + current;
            break;
        case '-':
            res = last - current;
            break;
        case '×':
            res = last * current;
            break;
        case '÷':
            res = last / current;
            break;

    }
    return res.toString();
}

const reducer = (state={
    currentOperand: "",
    lastOperand: "",
    operation: "",
    overwrite: false,

}, action) => {
    switch(action.type) {
        case ACTIONS.ADD_DIGIT:
            if(state.overwrite) {
                // state.currentOperand = "";  //不能直接修改state
                // state.overwrite = false;
                return {
                    ...state,
                    currentOperand: action.digit,
                    overwrite: false,
                }
            }

            //是零的话应该只有一个零
            // if(state.currentOperand === '0' && action.digit === '0') return state;
            //如果首位是0，且不是小数应该取消
            if(state.currentOperand === '0' && action.digit !== '.') return {
                ...state,
                currentOperand: action.digit,
            }
            //如果是小数点，且已经有小数点，则不再添加
            if(action.digit === '.' && state.currentOperand.includes('.')) {
                return state;
            }
            //如果第一位是小数点，则添加0
            if(action.digit === '.' && state.currentOperand === '') {
                return {
                    currentOperand: '0.'
                }
            }
            return {
                ...state,
                currentOperand: state.currentOperand + action.digit,
            }

            case ACTIONS.DELETE_DIGIT:
                if(state.overwrite) {
                    // state.currentOperand = "";
                    // state.overwrite = false;
                    return {
                        ...state,
                        currentOperand: "",
                        overwrite: false,
                    }
                }

                //如果是空，不需要删除
                if(state.currentOperand === '') return state;
                return {
                    ...state,
                    //将字符串的最后一位删掉
                    currentOperand: state.currentOperand.slice(0, -1),
                }


            case ACTIONS.CHOOSE_OPERATION:
                //如果当前没有数字，则不做任何操作
                if(state.currentOperand === "" && state.currentOperand === "") return state;
                if(state.lastOperand === "") {
                    return {
                        ...state,
                        lastOperand: state.currentOperand,
                        operation: action.operation,
                        currentOperand: "",
                    }
                }

                return {
                    ...state,
                    lastOperand: evaluate(state),
                    operation: action.operation,
                    currentOperand: "",
                }

                case ACTIONS.CLEAR:
                    return {
                        ...state,
                        currentOperand: "",
                        lastOperand: "",
                        operation: "",
                    }
                
                case ACTIONS.EVALUATE:
                    //如果当前没有数字，则不做任何操作
                    if(state.currentOperand === "" || state.lastOperand === "" || state.operation === "") return state;
                    return {
                        ...state,
                        currentOperand: evaluate(state),
                        lastOperand: "",
                        operation: "",
                        overwrite: true,
                    }


        default:
            return state;

    }
}

export default reducer;
