<script setup>

const bookStore = useBookStore();
onMounted(async () => {
  const booksList = await GqlGetBooks();
  bookStore.setList(booksList.books.books);
});

</script>
<template>
  <div class="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8 ">
    <ul v-if="bookStore.list.length" class="flex flex-col gap-4">
      <BookCard v-for="book in bookStore.list" :key="book.id" :book="book" />
    </ul>
    <span class="block mt-10 rounded-full bg-gray-300 w-full h-1" />
    <BookAddBook />
  </div>
</template>
  