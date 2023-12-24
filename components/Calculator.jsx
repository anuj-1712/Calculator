"use client";
import React, { useReducer } from "react";
import DigitBtn from "./DigitBtn";
import OperandBtn from "./OperandBtn";

const calculate = (state) => {
  let prev = parseFloat(state.previousValue);
  let current = parseFloat(state.currentValue);
  let solution = "";
  switch (state.operator) {
    case "%":
      let percentage = current / 100;
      let answer = (prev * percentage).toString();
      return answer;
    case "+":
      solution = prev + current;
      break;
    case "-":
      solution = prev - current;
      break;
    case "*":
      solution = prev * current;
      break;
    case "÷":
      solution = prev / current;
      break;
  }
  return solution.toString();
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "enterDigit":
      if (state.overwrite)
        return {
          ...state,
          currentValue: payload.digit,
          overwrite: false,
        };
      if (state.currentValue === "0" && payload.digit === "0") return state;
      if (state.currentValue?.includes(".") && payload.digit === ".")
        return state;
      return {
        ...state,
        currentValue: `${state.currentValue || ""}${payload.digit}`,
      };
    case "operator":
      if (!state.currentValue && !state.previousValue) return state;

      if (state.currentValue === null)
        return {
          ...state,
          operator: payload.operator,
        };

      if (!state.previousValue) {
        return {
          ...state,
          operator: payload.operator,
          previousValue: state.currentValue,
          currentValue: null,
        };
      }

      return {
        ...state,
        previousValue: calculate(state),
        operator: payload.operator,
        currentValue: null,
      };
    case "calculate":
      if (!state.previousValue || !state.currentValue || !state.operator)
        return state;
      return {
        ...state,
        overwrite: true,
        previousValue: null,
        operator: null,
        currentValue: calculate(state),
      };
    case "clearAll":
      return {};

    default:
      break;
  }
};

export default function Calculator() {
  const [{ currentValue, previousValue, operator, overwrite }, dispatch] =
    useReducer(reducer, {});
  return (
    <div className="w-10/12 max-w-[400px] p-4 bg-black rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col justify-end items-end h-[200px] mb-4 text-white p-2 rounded-md border-white border-2 border-opacity-70">
        <p className="h-[40px] text-white text-xl opacity-60">
          {previousValue}
          {operator}
        </p>
        <p className="text-white text-5xl">{currentValue || 0}</p>
      </div>
      <div className="grid gap-2 grid-cols-4">
        <button
          className="h-[70px] text-3xl font-medium text-black w-full bg-[lightgray] rounded-[50%]"
          onClick={() => dispatch({ type: "clearAll" })}
        >
          AC
        </button>
        <button className="h-[70px] text-3xl font-medium text-black w-full bg-[lightgray] rounded-[50%]">
          +/-
        </button>
        <button
          className="h-[70px] text-3xl font-medium text-black w-full bg-[lightgray] rounded-[50%]"
          onClick={() =>
            dispatch({ type: "operator", payload: { operator: "%" } })
          }
        >
          %
        </button>
        <OperandBtn
          operator="÷"
          handleFunc={() =>
            dispatch({ type: "operator", payload: { operator: "÷" } })
          }
        />
        <DigitBtn
          digit="7"
          handleFunc={() =>
            dispatch({ type: "enterDigit", payload: { digit: "7" } })
          }
        />
        <DigitBtn
          digit="8"
          handleFunc={() =>
            dispatch({ type: "enterDigit", payload: { digit: "8" } })
          }
        />
        <DigitBtn
          digit="9"
          handleFunc={() =>
            dispatch({ type: "enterDigit", payload: { digit: "9" } })
          }
        />
        <OperandBtn
          operator="x"
          handleFunc={() =>
            dispatch({ type: "operator", payload: { operator: "*" } })
          }
        />
        <DigitBtn
          digit="4"
          handleFunc={() =>
            dispatch({ type: "enterDigit", payload: { digit: "4" } })
          }
        />
        <DigitBtn
          digit="5"
          handleFunc={() =>
            dispatch({ type: "enterDigit", payload: { digit: "5" } })
          }
        />
        <DigitBtn
          digit="6"
          handleFunc={() =>
            dispatch({ type: "enterDigit", payload: { digit: "6" } })
          }
        />
        <OperandBtn
          operator="-"
          handleFunc={() =>
            dispatch({ type: "operator", payload: { operator: "-" } })
          }
        />
        <DigitBtn
          digit="1"
          handleFunc={() =>
            dispatch({ type: "enterDigit", payload: { digit: "1" } })
          }
        />
        <DigitBtn
          digit="2"
          handleFunc={() =>
            dispatch({ type: "enterDigit", payload: { digit: "2" } })
          }
        />
        <DigitBtn
          digit="3"
          handleFunc={() =>
            dispatch({ type: "enterDigit", payload: { digit: "3" } })
          }
        />
        <OperandBtn
          operator="+"
          handleFunc={() =>
            dispatch({ type: "operator", payload: { operator: "+" } })
          }
        />
        <DigitBtn
          digit="0"
          handleFunc={() =>
            dispatch({ type: "enterDigit", payload: { digit: "0" } })
          }
        />
        <DigitBtn
          digit="."
          handleFunc={() =>
            dispatch({ type: "enterDigit", payload: { digit: "." } })
          }
        />
        <OperandBtn
          operator="="
          handleFunc={() => dispatch({ type: "calculate" })}
        />
      </div>
    </div>
  );
}
