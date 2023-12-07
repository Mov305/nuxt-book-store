<script setup>

const CreatedAuthor = reactive({
    name: '',
});
const authorStore = useAuthorStore();


const handleSubmit = async () => {
    if (!CreatedAuthor.name) {
        alert('Please fill all the fields');
        return;
    }
    try {
        const token = useCookie('token');
        useGqlToken(token.value);
        const response = await GqlCreateAuthor({ createAuthorInput: CreatedAuthor });
        if (response?.createAuthor?._id) {
            authorStore.addAuthor({ ...CreatedAuthor, _id: response.createAuthor._id });
            alert('Author Added Successfully');
            CreatedAuthor.name = '';
        }
    } catch (e) {
        console.log(e);
    }
}



</script>
<template>
    <div class="px-6 md:px-10 py-16 mx-auto max-w-screen-xl flex flex-col items-center md:items-start">
        <h2 class="my-2 text-xl md:text-3xl text-gray-500 dark:text-gray-200 font-semibold">
            AUTHORS
        </h2>
        <ul v-if="authorStore.list.length" class="flex flex-col gap-4 w-full dark:text-white">
            <li v-for="author in authorStore.list" :key="author._id" class="w-full">
                <NuxtLink :to="`/authors/${author._id}`"
                    class="w-full p-4 text-sm border-gray-300 block dark:bg-slate-500 rounded-lg shadow-md transition hover:bg-slate-100 dark:hover:bg-slate-400">
                    {{ author.name }}
                </NuxtLink>
            </li>
        </ul>
        <SkeletonLoad v-else />
        <!-- createAuthor -->
        <div class="py-16 max-w-screen-xl flex flex-col self-stretch ">
            <h2 class="my-2 text-xl md:text-3xl text-gray-500 dark:text-gray-200 font-semibold w-full">
                ADD NEW AUTHOR
            </h2>
            <form class=" flex flex-col gap-2 w-full dark:text-white">
                <div class="flex flex-wrap w-full gap-2">
                    <div class=" md:w-[50%] grow">
                        <div class="relative">
                            <input type="text"
                                class="w-full p-4 text-sm border-gray-300 dark:bg-slate-500 rounded-lg shadow-md "
                                placeholder="Enter The Author Name" v-model="CreatedAuthor.name" />
                        </div>
                    </div>
                </div>
                <button type="submit" class="inline-block px-5 py-3 text-sm font-medium text-white bg-[#08ACB4] rounded-lg"
                    @click="handleSubmit">
                    ADD AUTHOR
                </button>
            </form>
        </div>
    </div>
</template>

