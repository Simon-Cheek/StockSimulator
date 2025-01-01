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
  onClick?: (data: { name: string; amount: string }) => void;
  buttonText: string;
  firstText?: string;
  secondText?: string;
}

const defaultFirstText = "Name of Stock (Ticker Symbol)";
const defaultSecondText = "Number of Stocks";

export function InputForm({
  onClick,
  buttonText,
  firstText = defaultFirstText,
  secondText = defaultSecondText,
  ...props
}: CustomProps) {
  // State to hold the input value
  const [nameValue, setNameValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const handleClick = () => {
    try {
      if (onClick) onClick({ name: nameValue, amount: numberValue });
    } catch {
      alert("Invalid Input");
    }
  };
  return (
    <div className={styles.inputFormContainer}>
      <div className={styles.inputContainer}>
        <Paragraph style={{ margin: "0px", marginLeft: "12px" }}>
          {firstText}
        </Paragraph>
        <input
          {...props}
          className={styles.input}
          onChange={(e) => setNameValue(e.target.value)}
        />
      </div>

      <div className={styles.inputContainer}>
        <Paragraph style={{ margin: "0px", marginLeft: "12px" }}>
          {secondText}
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
}

Input.displayName = "Input";
