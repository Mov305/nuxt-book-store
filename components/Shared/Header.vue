<script setup>

const router = useRouter();
const userStore = useUserStore();
const user = userStore.user;

const handleLogout = () => {
    const tokenCookie = useCookie('token', null);
    userStore.setUser({ name: null, email: null, books: [] });
    tokenCookie.value = null;
    router.push('/signin');
};

const navList = [
    {
        name: 'Books',
        url: '/',
    },
    {
        name: 'Authors',
        url: '/authors',
        icon: 'icon-park:write'
    },
    {
        name: 'Profile',
        url: '/profile',
    },
];

const open = ref(false);

const setOpen = (value) => {
    open.value = value;
};

const closeStyle =
    'w-8 block m-[6px] rounded-full bg-gray-700 h-1 transition-all ease-in-out duration-200 dark:bg-gray-300';

const handleMode = () => {
    const body = document.querySelector('body');
    body.classList.toggle('dark');
};

</script>

<template>
    <header class=" bg-slate-100 shadow-lg dark:bg-gray-800 dark:text-slate-100">
        <div class="px-4 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="w-20 md:w-28 mt-2 md:mt-8  ">
                    <img class="w-full drop-shadow-2xl " src="~/assets/images/logo_transparent.png" alt="logo" />
                </div>
                <div class="md:static relative flex-1">
                    <div class="hidden md:flex md:flex-1">
                        <nav class="flex flex-1 flex-col md:flex-row justify-center gap-8 md:gap-0">
                            <ul class="flex flex-col md:items-center text-sm md:text-lg gap-6 md:flex-row">
                                <li v-for="item in navList" :key="item.name">
                                    <NuxtLink :to="item.url" class="transition cursor-pointer hover:text-gray-500/75"
                                        @click="setOpen(false)">
                                        {{ item.name }}
                                    </NuxtLink>
                                </li>
                            </ul>
                            <div class="flex md:justify-center md:items-center relative w-28">
                                <label htmlFor="AcceptConditions" class="relative w-12 h-[28px] cursor-pointer">
                                    <input type="checkbox" id="AcceptConditions" class="sr-only peer" />
                                    <span @click="handleMode"
                                        class="absolute inset-0 bg-[#08ACB4] rounded-full transition peer-checked:bg-gray-700 p-1 flex items-center justify-between">
                                        <Icon name="eva:moon-fill" class=" text-lg text-gray-300" />
                                        <Icon name="eva:sun-fill" class=" text-lg text-amber-500" />
                                    </span>
                                    <span @click="handleMode"
                                        class="absolute inset-0 w-5 h-5 m-1 bg-white rounded-full transition peer-checked:translate-x-5"></span>
                                </label>
                            </div>
                        </nav>

                        <button v-if="userStore.user.name" type="button"
                            class="flex items-center rounded-lg transition group shrink-0 order-first md:order-last">
                            <img class="object-cover w-10 h-10 rounded-full" src="~/assets/images/unkwon.png"
                                alt="Abdelrhman" />
                            <p class=" ml-2 text-xs text-left sm:block">
                                <strong class="block font-medium">
                                    {{ userStore.user.name }}
                                </strong>
                                <span class="text-gray-500 dark:text-gray-300">{{ userStore.user.email }}</span>
                            </p>
                            <!-- logout Icon -->
                            <Icon name="eva:log-out-fill"
                                class="w-5 h-5 ml-4 text-gray-500 transition sm:block group-hover:text-gray-700"
                                @click="handleLogout" />
                        </button>
                        <div v-else class="flex items-center gap-4">
                            <NuxtLink to="/signin"
                                class="inline-block px-5 py-3 text-sm font-medium text-white rounded-lg bg-[#08ACB4]">
                                Sign in
                            </NuxtLink>
                            <NuxtLink to="/signup"
                                class="inline-block px-5 py-3 text-sm font-medium text-white rounded-lg bg-[#08ACB4]">
                                Sign up
                            </NuxtLink>
                        </div>
                    </div>
                </div>


                <div @click="setOpen(false)"
                    :class="`fixed z-50 flex flex-col bg-slate-200 nav_menu dark:bg-black bg-opacity-50 transition rounded-lg p-2 backdrop-blur-sm md:hidden ${open ? 'opacity-100 translate-y-1/2' : 'opacity-0 pointer-events-none translate-y-0'}`">
                    <nav class="flex flex-1 flex-col md:flex-row justify-center gap-8 md:gap-0">
                        <ul class="flex flex-col md:items-center text-sm md:text-lg gap-3 md:flex-row">
                            <li v-for="item in navList" :key="item.name"
                                class="cursor-pointer p-2 hover:bg-slate-300 transition rounded-md dark:hover:bg-slate-700">
                                <NuxtLink :to="item.url" class="transition cursor-pointer hover:text-gray-500/75"
                                    @click="setOpen(false)">
                                    {{ item.name }}
                                </NuxtLink>
                            </li>
                        </ul>
                        <div class="flex md:justify-center md:items-center relative w-28">
                            <label htmlFor="AcceptConditions" class="relative w-12 h-[28px] cursor-pointer">
                                <input type="checkbox" id="AcceptConditions" class="sr-only peer" />
                                <span @click="handleMode"
                                    class="absolute inset-0 bg-[#08ACB4] rounded-full transition peer-checked:bg-gray-700 p-1 flex items-center justify-between">
                                    <Icon name="eva:moon-fill" class=" text-lg text-gray-300" />
                                    <Icon name="eva:sun-fill" class=" text-lg text-amber-500" />
                                </span>
                                <span @click="handleMode"
                                    class="absolute inset-0 w-5 h-5 m-1 bg-white rounded-full transition peer-checked:translate-x-5"></span>
                            </label>
                        </div>
                    </nav>

                    <button v-if="userStore.user.name" type="button"
                        class="flex items-center rounded-lg transition group shrink-0 order-first md:order-last">
                        <img class="object-cover w-10 h-10 rounded-full" src="~/assets/images/unkwon.png"
                            alt="Abdelrhman" />
                        <p class=" ml-2 text-xs text-left sm:block">
                            <strong class="block font-medium">{{ userStore.user.name }}</strong>
                            <span class="text-gray-500 dark:text-gray-300">{{ userStore.user.email }}</span>
                        </p>
                        <!-- logout Icon -->
                        <Icon name="eva:log-out-fill"
                            class="w-5 h-5 ml-4 text-gray-500 transition sm:block group-hover:text-gray-700"
                            @click="handleLogout" />
                    </button>
                    <div v-else class="flex items-center gap-4 order-first justify-center ">
                        <NuxtLink to="/signin"
                            class="inline-block px-5 py-3 text-sm font-medium text-white rounded-lg bg-[#08ACB4]">
                            Sign in
                        </NuxtLink>
                        <NuxtLink to="/signup"
                            class="inline-block px-5 py-3 text-sm font-medium text-white rounded-lg bg-[#08ACB4]">
                            Sign up
                        </NuxtLink>
                    </div>
                </div>

                <div class="flex items-center gap-4">
                    <div class="block md:hidden" @click="setOpen(!open)">
                        <span :class="`${closeStyle} ${open ? 'rotate-45 translate-y-[10px]' : ''}`" />
                        <span :class="`${closeStyle} ${open ? 'opacity-0' : ''}`" />
                        <span :class="`${closeStyle} ${open ? '-rotate-45 -translate-y-[10px]' : ''}`" />
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
.router-link-active {
    @apply !text-cyan-600 !font-semibold;
}

.nav_menu {
    @apply w-fit sm:w-5/6
}
</style>