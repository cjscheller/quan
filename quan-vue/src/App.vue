<template>
    <div id="app" class="font-karla px-20">
        <div id="nav" class="p-10 font-medium">
            <router-link to="/transactions">Transactions</router-link> |
            <router-link to="/categories">Categories</router-link>
        </div>
        <router-view />
    </div>
</template>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav a {
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
