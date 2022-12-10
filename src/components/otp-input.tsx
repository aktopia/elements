import React, { useCallback, useEffect, useId, useRef } from "react";
import { SingleCharacterInput } from "components/single-character-input";

function keydownHandler(
  e: KeyboardEvent,
  index: number,
  refs: React.MutableRefObject<HTMLInputElement>[],
  onInputComplete: Function
) {
  if (e.key === "Backspace") {
    refs[index].current.value = "";
    if (index !== 0) {
      refs[index - 1].current.focus();
      e.preventDefault();
    }
  } else {
    if (index === refs.length - 1 && refs[index].current.value !== "") {
      return true;
    } else if (e.keyCode > 47 && e.keyCode < 58) {
      refs[index].current.value = e.key;
      if (index !== refs.length - 1) {
        refs[index + 1].current.focus();
        e.preventDefault();
      }
    } else if (e.keyCode > 64 && e.keyCode < 91) {
      refs[index].current.value = String.fromCharCode(e.keyCode);
      if (index !== refs.length - 1) {
        refs[index + 1].current.focus();
        e.preventDefault();
      }
    }

    if (refs.every((ref) => !!ref.current.value)) {
      const slotValues = refs.map((ref) => ref.current.value);
      onInputComplete(slotValues);
    }
  }
}

export const OTPInput = ({ characters, num, onInputComplete }: any) => {
  const refs: React.MutableRefObject<HTMLInputElement>[] = [...Array(num)].map(
    (_) => useRef() as React.MutableRefObject<HTMLInputElement>
  );

  useEffect(() => {
    const eventHandlers = refs.map(
      (_, index) => (e: KeyboardEvent) =>
        keydownHandler(e, index, refs, console.log)
    );

    refs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.addEventListener("keydown", eventHandlers[index]);
      }
    });

    return () =>
      refs.forEach((ref, index) => {
        ref.current.removeEventListener("keydown", eventHandlers[index]);
      });
  }, [...refs.map((ref) => ref.current)]);

  return (
    <>
      {refs.map((ref, index) => (
        <SingleCharacterInput
          id={useId()}
          ref={ref}
          key={index}
          value={characters && characters[index]}
        />
      ))}
    </>
  );
};

/*
TODO
Mobile responsiveness
 */
