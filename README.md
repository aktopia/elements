# Elements Design System

This is a mono repo with two projects `lib` and `storybook`. All the components and compositions are created in `lib`
and the stories for these are written in `storybook`.

## Pure components

- No internal or external state.
- Only depend on their props.
- Atomic and reusable.
- Domain agnostic.
- Should be placed in `lib/src/components`.

## Connected components
- Depend on external state (`useValue`, `useDispatch` and `useTranslation`).
- Not very reusable.
- Domain dependent.
- Should be placed in `lib/src/compositions`.

## Workflow to create a component

- Start storybook from the storybook folder
  ```shell
  npm run storybook
  ```
- Add atomic components to `lib/src/components` or compositions to `lib/src/compositions`
- Write stories for these in `storybook/src/stories`. Follow the same folder structure as that of `lib`.
- Tweak and play with the components in storybook as you develop.

TODO
cva
no useEffect or useState, all should be controlled
mock store usage
translations
connected in compositions
pure in components
routes
suspensify and pending
