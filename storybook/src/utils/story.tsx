import { DispatchMock, MockStore, ReadMock } from '@story/utils/mock-store';

interface IStory {
  store: { read: ReadMock; dispatch: DispatchMock };
  render: () => JSX.Element;
}

export const story = ({ store, render }: IStory) => {
  return {
    args: store.read,
    render: (args: any) => {
      return (
        <MockStore dispatch={store.dispatch} read={args}>
          {render()}
        </MockStore>
      );
    },
  };
};
