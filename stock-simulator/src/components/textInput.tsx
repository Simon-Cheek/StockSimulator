"use client";
import { Button } from "./button";
import styles from "./components.module.css";
import { forwardRef, useState } from "react";
import { Paragraph } from "./paragraph";
import { Separator } from "./separator";

export const Input = forwardRef<HTMLInputElement>(({ ...props }, ref) => (
  <input ref={ref} {...props} className={styles.input}></input>
));

interface CustomProps {
  onClick?: (data: { name: string; amount: number }) => void;
  buttonText: string;
}

export const InputForm = ({ onClick, buttonText, ...props }: CustomProps) => {
  // State to hold the input value
  const [nameValue, setNameValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const handleClick = () => {
    try {
      const stockAmount = parseInt(numberValue);
      if (Number.isNaN(stockAmount)) throw Error;
      onClick && onClick({ name: nameValue, amount: stockAmount });
    } catch {
      alert("Invalid Input");
    }
  };
  return (
    <div className={styles.inputFormContainer}>
      <div className={styles.inputContainer}>
        <Paragraph style={{ margin: "0px", marginLeft: "12px" }}>
          Name of Stock (Ticker Symbol)
        </Paragraph>
        <input
          {...props}
          className={styles.input}
          onChange={(e) => setNameValue(e.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <Paragraph style={{ margin: "0px", marginLeft: "12px" }}>
          Number of Stocks
        </Paragraph>
        <input
          {...props}
          className={styles.input}
          onChange={(e) => setNumberValue(e.target.value)}
        />
      </div>

      <Separator />
      <div>
        <Button hollow onClick={handleClick}>
          {buttonText}
        </Button>

        <Button hollow href="/">
          Back to Home
        </Button>
      </div>
    </div>
  );
};
