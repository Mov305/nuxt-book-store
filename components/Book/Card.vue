<script setup >
const { book } = defineProps(['book']);

const { title, description, author, price, coverImage, _id } = book;

const user = useUserStore();
const bookStore = useBookStore();

const handleBuy = async (id) => {
    if (!user.user._id) {
        alert('Please Login First');
        return;
    }
    try {
        const token = useCookie('token');
        useGqlToken(token.value);
        const response = await GqlBuyBook({ buyBookInput: { bookId: id, userId: user.user._id } });
        if (response?.buyBook?._id) {
            bookStore.addReader(user.user._id, id);
            alert('Book Bought Successfully');
        }
    } catch (e) {
        console.log(e);
    }
};

</script>
<template>
    <li
        class="relative flex flex-col items-center p-8 overflow-hidden border bg-white border-gray-200 rounded-lg md:flex-row md:justify-between dark:bg-gray-800 ">
        <span class="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
        <div class="flex flex-col items-center md:items-start md:flex-grow md:max-w-2xl">
            <span class="mt-1 text-lg text-gray-500 font-semibold dark:text-gray-300 ">
                {{ title || 'title' }}
            </span>

            <h5 class="text-xl font-bold text-gray-900 dark:text-slate-50">{{ description || 'Description' }}</h5>
            <span class="text-[#08ACB4] font-thin dark:font-normal">{{ author.name || 'Author' }}</span>
            <div class="flex text-[#08ACB4] py-4">
                <button @click="handleBuy(_id)" type="button"
                    class=" border-r-4 border-[#E8E8E8] dark:border-slate-400 pr-3">
                    Buy
                </button>
                <span type="button" class=" border-[#E8E8E8] dark:border-slate-400 px-3">
                    {{ price || 'price' }} $
                </span>
            </div>
        </div>
        <div class="flex flex-1 items-center justify-end">
            <img class="object-cover w-32 h-40 rounded-lg" :src="coverImage" alt="book" />
        </div>
    </li>
</template>