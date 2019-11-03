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
      <ul>
        <router-link to="/home" tag="li" class="main-nav-item">
          <span>首页</span>
        </router-link>
        <router-link to="/" tag="li" class="main-nav-item">
          <span>攻略中心</span>
        </router-link>
        <router-link to="/" tag="li" class="main-nav-item">
          <span>赛事中心</span>
        </router-link>
      </ul>
    </nav>

    <div id="main">
      <router-view></router-view>
    </div>
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
  // justify-content: space-around;
  // align-items: center;

  img {
    margin-top: 0.5rem;
    margin-left: 1.0625rem;
  }

  .logo-title {
    margin-top: 0.5rem;
    margin-left: 0.625rem;
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
    width: 3.75rem;
    height: 1.5rem;
    border: 0;
    border-radius: 0.125rem;
    font-size: 0.625rem;
    padding: 0.4063rem 0.5rem;
    margin-top: 0.5625rem;
    margin-right: 0.9375rem;
  }
}

.main-nav {
  margin-top: 2.8125rem;
  color: #fff;
  font-size: 0.8125rem;
  height: 2.625rem;

  ul {
    height: 100%;
  }

  .main-nav-item {
    display: list-item;
    width: 33.33333%;
    height: 2.625rem;
    float: left;
    line-height: 2.625rem;
    text-align: center;

    span {
      padding-bottom: 2px;
      border-bottom: 3px solid rgba($color: #000000, $alpha: 0);
    }
    &.router-link-exact-active {
      span {
        border-bottom: 3px solid white;
      }
    }
  }
}
</style>