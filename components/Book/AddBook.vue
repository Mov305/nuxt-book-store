<script setup>




const AddedBook = reactive({
    title: '',
    description: '',
    coverImage: '',
    author: '',
    price: null,

});

const resetBook = () => {
    AddedBook.title = '';
    AddedBook.description = '';
    AddedBook.coverImage = '';
    AddedBook.author = '';
    AddedBook.price = null;
};

const Authors = useAuthorStore();
const BookStore = useBookStore();

const handleSubmit = async (event) => {
    event.preventDefault();
    // if one of the fields is empty return
    if (!AddedBook.title || !AddedBook.description || !AddedBook.coverImage || !AddedBook.author || !AddedBook.price) {
        alert('Please fill all the fields');
        return;
    }
    try {
        const token = useCookie('token');
        useGqlToken(token.value);
        const response = await GqlCreateBook({ createBookInput: AddedBook });
        if (response?.createBook?._id) {
            BookStore.addBook({ ...AddedBook, _id: response.createBook._id, author: Authors.list.find(author => author._id === AddedBook.author) });
            alert('Book Added Successfully');
            resetBook();
        }
    } catch (e) {
        console.log(e);
    }

};
</script>

<template>
    <div class="py-16 mx-auto max-w-screen-xl flex flex-col items-center md:items-start">
        <h2 class="my-2 text-xl md:text-3xl text-gray-500 dark:text-gray-200 font-semibold">
            ADD NEW BOOK
        </h2>
        <form class=" flex flex-col gap-2 w-full dark:text-white">
            <div class="flex flex-wrap w-full gap-2">

                <div class=" md:w-[50%] grow">
                    <div class="relative">
                        <input type="text"
                            class="w-full p-4 text-sm border-gray-300 dark:bg-slate-500 rounded-lg shadow-md "
                            placeholder="Enter The Book Title" v-model="AddedBook.title" />
                    </div>
                </div>
                <div class="md:w-[20%]">
                    <div class="relative">
                        <select class="w-full p-4 text-sm border-gray-300 dark:bg-slate-500 rounded-lg shadow-md"
                            v-model="AddedBook.author">
                            <option value="" disabled selected class="dark:text-gray-100">Select Author</option>
                            <option v-for="author in Authors.list" :key="author.id" :value="author._id"
                                class=" dark:text-gray-200">
                                {{ author.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="md:w-[20%]">
                    <div class="relative">
                        <input type="number"
                            class="w-full p-4 text-sm border-gray-300 dark:bg-slate-500 rounded-lg shadow-md"
                            placeholder="Enter the Price" v-model="AddedBook.price" />
                    </div>
                </div>
            </div>
            <div class="">
                <div class="relative">
                    <input class="w-full p-4 text-sm border-gray-300 dark:bg-slate-500 rounded-lg shadow-md"
                        placeholder="Cover Image" v-model="AddedBook.coverImage" />
                </div>
            </div>
            <div class="">
                <div class="relative">
                    <textarea rows="3" class="w-full p-4 text-sm border-gray-300 dark:bg-slate-500 rounded-lg shadow-md"
                        placeholder="Description" v-model="AddedBook.description" />
                </div>
            </div>
            <button class="inline-block px-5 py-3 text-sm font-medium text-white bg-[#08ACB4] rounded-lg"
                @click="handleSubmit">
                ADD BOOK
            </button>
        </form>
    </div>
</template>