import {
  RawButton,
  RawComboBox,
  RawInput,
  RawItem,
  RawLabel,
  RawListBox,
  RawPopover,
} from '@elements/components/_raw';

// function formatOptionText({ description, matched_substrings }: any) {
//   // TODO handle multiple matched_substrings, truncate on the correct span
//   const { offset, length } = matched_substrings[0];
//   return (
//     <span className={'truncate'}>
//       <span className={'whitespace-pre text-sm font-normal text-stone-600'}>
//         {description.slice(0, offset)}
//       </span>
//       <span className={'whitespace-pre text-sm font-semibold text-stone-800'}>
//         {description.slice(offset, offset + length)}
//       </span>
//       <span className={'whitespace-pre text-sm font-normal text-stone-600'}>
//         {description.slice(length + offset)}
//       </span>
//     </span>
//   );
// }

// interface Item {
//   id: string;
// }

export const ComboBox = () => {
  return (
    <RawComboBox>
      <RawLabel>{'Favorite Animal'}</RawLabel>
      <div>
        <RawInput />
        <RawButton>{'▼'}</RawButton>
      </div>
      <RawPopover>
        <RawListBox>
          <RawItem>{'Aardvark'}</RawItem>
          <RawItem>{'Cat'}</RawItem>
          <RawItem>{'Dog'}</RawItem>
          <RawItem>{'Kangaroo'}</RawItem>
          <RawItem>{'Panda'}</RawItem>
          <RawItem>{'Snake'}</RawItem>
        </RawListBox>
      </RawPopover>
    </RawComboBox>
  );
};
