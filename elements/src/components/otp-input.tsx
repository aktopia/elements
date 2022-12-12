import React, { useEffect, useId, useRef } from "react";
import { SingleCharacterInput } from "@elements/components/single-character-input";

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
    return;
  }

  if (index === refs.length - 1 && refs[index].current.value !== "") {
    return;
  }

  if (e.keyCode > 47 && e.keyCode < 58) {
    refs[index].current.value = e.key;
    if (index !== refs.length - 1) {
      refs[index + 1].current.focus();
      e.preventDefault();
    }
  }

  if (e.keyCode > 64 && e.keyCode < 91) {
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

export const OTPInput = ({ characters, num, onInputComplete }: any) => {
  const refs: React.MutableRefObject<HTMLInputElement>[] = [...Array(num)].map(
    (_) => useRef() as React.MutableRefObject<HTMLInputElement>
  );

  useEffect(() => {
    const eventHandlers = refs.map(
      (_, index) => (e: KeyboardEvent) =>
        keydownHandler(e, index, refs, onInputComplete)
    );

    refs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.addEventListener("keydown", eventHandlers[index]);
      }
    });

    return () => {
      refs.forEach((ref, index) => {
        if (ref.current) {
          ref.current.removeEventListener("keydown", eventHandlers[index]);
        }
      });
    };
  }, [refs]);

  return (
    <div className={"flex gap-4"}>
      {refs.map((ref, index) => (
        <SingleCharacterInput
          id={useId()}
          ref={ref}
          key={index}
          value={characters && characters[index]}
        />
      ))}
    </div>
  );
};

/*
TODO
Mobile responsiveness
Number only input
On paste
Auto complete from messages
preventDefault consuming browser keyboard shortcuts
 */
