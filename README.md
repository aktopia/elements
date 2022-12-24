# Elements Design System

This is a mono repo with two projects `lib` and `storybook`. All the components and compositions are created in `lib` and the stories for these are added in `storybook`.

## Workflow to create a component
- Start storybook from the storybook folder 
  ```shell
  npm run storybook
  ```
- Add atomic components to `lib/src/components` or compositions to `lib/src/compositions` 
- Write stories for these in `storybook/src/stories`. Follow the same folder structure as that of `lib`.
- Tweak and play with the components in storybook as you develop.
