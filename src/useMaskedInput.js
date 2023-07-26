/**
 * A custom hook for handling masked input with a given mask pattern.
 * 
 * @param {string} options.mask - The mask pattern to apply to the input value.
 * @param {string} options.defaultValue - The initial value for the input.
 * @returns {[string, string, function]} - An array containing the masked input value,
 * the derived value without mask characters, and a function to update the input value.
 */
import { useMemo, useState } from "react";

const useMaskedInput = ({ mask, defaultValue }) => {
    const INPUT_FLOWS = {
        WRITE: 1,
        DELETE: 0
    }
    const [input, setInput] = useState(defaultValue);
    const [inputFLow, setInputFlow] = useState(INPUT_FLOWS.WRITE);
    const updateInput = (newInput) => {
        console.log(input,newInput)
        if (newInput.length >= input.length) {
            //handel write 
            if(/[0-9]/.test(newInput[newInput.length-1])){
                setInputFlow(INPUT_FLOWS.WRITE);
                setInput(newInput);
            }
        } else {
            //handel delete
            //delete happend if Click backspace or delete all 
            if(newInput.length===0||newInput === input.slice(0,input.length-1)){   
                setInputFlow(INPUT_FLOWS.DELETE);
                setInput(newInput);
            }
            
        }
    };
    let deriveValue = function (masked_value) {
        //get only numbers from String 
        return masked_value.replace(/\D/g, '');
    }
    let deriveMaske = function (input) {
        //derive the result depend on the input and mask pattern
        console.log(inputFLow)
        if(inputFLow===INPUT_FLOWS.DELETE){
            return input;
        }
        let ValueIndex = 0;
        let Value_numbers = deriveValue(input);
        let mask_arr = mask.split("");
        let ans = [];
        for (let i = 0; i < mask_arr.length;) {
            if(ValueIndex>=Value_numbers.length)break;
            while (i < (mask.length) && mask[i] !== "9") {
                ans.push(mask[i++]);
            }
            if (mask_arr[i++] === "9") ans.push(Value_numbers[ValueIndex++])
            else {
                ans.push(mask[i++]);
            }
            while (i < (mask.length) && mask[i] !== "9") {
                ans.push(mask[i++]);
            }
        }
        setInput(ans.join(""))
        return ans.join("");
    }
    const maskedInput = useMemo(() => deriveMaske(input), [input]);
    const value = useMemo(() => deriveValue(maskedInput), [maskedInput]);

    return [maskedInput, value, updateInput];
};



export default useMaskedInput;