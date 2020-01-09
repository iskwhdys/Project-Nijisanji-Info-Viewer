<template>
  <div id="app">
    <div id="Header">
      <div id="Banner">
        <img src="../src/assets/logo.png"/> 
      </div>
      <div id="Menu">
        <router-link to="/">新着動画</router-link> |
        <router-link to="/ranking">ランキング</router-link> |
        <router-link to="/manager">管理</router-link>
      </div>
    </div>

    <router-view />

    <div id="Footer"></div>
  </div>
</template>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;

  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#Header {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
