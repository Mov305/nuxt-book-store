export const useBookStore = defineStore({
  id: 'book',
  state: () => ({
    list: [] as bookInterface[],
  }),
  actions: {
    setList(list: bookInterface[]) {
      this.list = list;
    },
    addBook(book: bookInterface) {
      this.list.push(book);
    },
    AuthorBooks(authorId: any) {
      return this.list.filter((book) => book.author._id === authorId);
    },
    usersBooks(userId: any) {
      return this.list.filter((book) => {
        return book.readers.find((reader) => reader._id === userId);
      });
    },
    addReader(bookId: any, userId: any) {
      const book = this.list.find((book) => book._id === bookId);
      if (book) {
        book.readers.push({ _id: userId });
      }
      
    },
  },
});

type bookInterface = {
  _id: any;
  title: string;
  description: string;
  coverImage: string;
  price: number;
  author: any;
  readers: any[];
};
