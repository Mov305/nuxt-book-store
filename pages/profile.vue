<script setup>

const user = useUserStore();
const bookStore = useBookStore();
console.log(bookStore);

</script>

<template>
    <div v-if="user.user.name"
        class="px-6 md:px-10 py-16 mx-auto max-w-screen-xl flex flex-col items-center md:items-start">
        <h2 class="my-2 text-xl md:text-3xl text-gray-500 dark:text-gray-200 font-semibold">
            PROFILE
        </h2>
        <div class="flex flex-col gap-4 w-full dark:text-white">
            <div class="w-full">
                <div
                    class="w-full p-4 text-sm border-gray-300 block dark:bg-slate-500 rounded-lg shadow-md transition hover:bg-slate-100 dark:hover:bg-slate-400">
                    <span class="font-semibold">Name:</span> {{ user.user.name }}
                </div>
            </div>
            <div class="w-full">
                <div
                    class="w-full p-4 text-sm border-gray-300 block dark:bg-slate-500 rounded-lg shadow-md transition hover:bg-slate-100 dark:hover:bg-slate-400">
                    <span class="font-semibold">Email:</span> {{ user.user.email }}
                </div>
            </div>
            <div class="w-full">
                <div
                    class="w-full p-4 text-sm border-gray-300 block dark:bg-slate-500 rounded-lg shadow-md transition hover:bg-slate-100 dark:hover:bg-slate-400">
                    <span class="font-semibold">Bought Books:</span> {{ bookStore.usersBooks(user.user._id).length || 0  }}
                </div>
            </div>
        </div>

        <div class="py-16 w-full">
            <h2 class="my-2 text-xl md:text-3xl text-gray-500 dark:text-gray-200 font-semibold">
                BOUGHT BOOKS
            </h2>
            <ul v-if="bookStore.usersBooks(user.user._id).length" class="flex flex-col gap-4">
                <BookCard v-for="book in bookStore.usersBooks(user.user._id)" :key="book.id" :book="book" />
            </ul>
        </div>
    </div>
    <NuxtLink v-else to="/signin"
        class="px-6 md:px-10 py-16 mx-auto w-full flex flex-col items-center justify-center">
        <h2 class="my-2 text-xl md:text-3xl text-gray-500 dark:text-gray-200 dark:bg-slate-600 font-semibold rounded-lg shadow-md p-4 hover:bg-slate-500 dark:hover:bg-slate-400 transition">
            LOGIN TO VIEW PROFILE
        </h2>
    </NuxtLink>
</template>