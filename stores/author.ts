export const useAuthorStore = defineStore({
  id: 'author',
  state: () => ({
    list: [] as authorInterface[],
  }),
  actions: {
    setList(list: authorInterface[]) {
      this.list = list;
    },
    addAuthor(author: authorInterface) {
      this.list.push(author);
    },
  },
});

type authorInterface = {
  _id: any;
  name: string;
  books: any[];
};
