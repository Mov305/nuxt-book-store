export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      _id: null,
      name: null,
      email: null,
      books: [] as any[],
    },
  }),
  actions: {
    setUser(user: any) {
      this.user = user;
    },
    addBook(book: any) {
      this.user.books.push(book);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
