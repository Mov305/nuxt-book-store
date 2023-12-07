<script setup>

const { id } = useRoute().params;

const books = useBookStore();


const AuthorName = computed(() => {
    const authors = useAuthorStore();
    return authors.list.find(author => author._id === id)?.name;
});

</script>
<template>
    <div>
        <div class="py-16 px-6 md:px-10 mx-auto max-w-screen-xl flex flex-col items-center md:items-start">
            <h2 class="my-2 text-xl md:text-3xl text-gray-500 dark:text-gray-200 font-semibold">
                AUTHOR: {{ AuthorName }}
            </h2>
        </div>
        <div class="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8 ">
            <ul v-if="books.AuthorBooks(id).length" class="flex flex-col gap-4">
                <BookCard v-for="book in books.AuthorBooks(id)" :key="book.id" :book="book" />
            </ul>
            <p v-else class="text-center text-gray-500 dark:text-gray-200 font-semibold">No Books Found</p>
        </div>

    </div>
</template>


<style  scoped></style>