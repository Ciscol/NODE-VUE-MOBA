<template>
  <div>
    <div class="home-top">
      <router-link to="/" tag="div">
        <img src="../assets/logo.png" height="30" alt />
      </router-link>
      <div class="logo-title">
        <h1>王者荣耀</h1>
        <p>团队成就更多</p>
      </div>
      <button class="btn bg-primary">立即下载</button>
    </div>

    <nav class="main-nav bg-primary">
      <router-link to="/" tag="div" class="main-nav-item .active">首页</router-link>
      <router-link to="/" tag="div" class="main-nav-item">攻略中心</router-link>
      <router-link to="/" tag="div" class="main-nav-item">赛事中心</router-link>
    </nav>

    <!-- <div id="main">
      <router-view></router-view>
    </div>-->
  </div>
</template>

<style lang="scss" scoped>
.home-top {
  background: url("../assets/index.png");
  background-position-y: -383px;
  background-size: 400px;
  position: fixed;
  left: 0;
  top: 0;
  height: 45px;
  width: 100%;
  z-index: 20;
  display: flex;
  justify-content: space-around;
  align-items: center;

  img {
    margin-left: 0.9375rem;
  }

  .logo-title {
    margin-left: 10px;
    flex: 1;
    h1 {
      color: #fff;
      font-size: 0.8125rem;
      font-weight: 500;
      line-height: 1.0625rem;
    }
    p {
      font-size: 9.6px;
      line-height: 15px;
      font-weight: 400;
      color: rgb(102, 102, 102);
    }
  }
  .btn {
    border: 0;
    border-radius: 0.125rem;
    font-size: 0.625rem;
    padding: 0.4063rem 0.5rem;
    margin-right: 0.9375rem;
  }
}

.main-nav {
  margin-top: 45px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  font-size: 13px;
  height: 42px;

  .main-nav-item {
    padding: 2px 0;
    border-bottom: 3px solid transparent;

    &.active {
      border-bottom: 3px solid white;
    }
  }
}
</style>