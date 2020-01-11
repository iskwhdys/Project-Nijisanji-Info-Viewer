<template>
  <div id="app">
    <div id="Header">
      <div id="Banner">
       <a href = "./"><img src="../src/assets/logo.png" /></a>
      </div>
      <div id="Menu">
        <router-link exact class="MenuItem" to="/">ライブ・新着</router-link>
        <router-link class="MenuItem" to="/ranking">24時間ランキング</router-link>
        <router-link class="MenuItem" to="/ranking">配信予定</router-link>
        <router-link class="MenuItem" to="/manager">管理</router-link>
      </div>
    </div>

    <router-view id="Main"/>

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

  color: #2c3e50;
}

#Header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

#Menu {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.MenuItem {
  padding: 10px;
  margin: 10px;
  color: #494949; 
  border: solid 2.5px #d4d4d4;
  text-decoration: none;
}
.MenuItem:hover {
  text-decoration: underline;
  border: solid 2.5px #525252;
}
.router-link-active {
  text-decoration: none;
  border: solid 2.5px #525252;
}

.router-link-active:hover  {
  text-decoration: none;
  border: solid 2.5px #525252;
  cursor: default;
}
#Main {  
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}
</style>
