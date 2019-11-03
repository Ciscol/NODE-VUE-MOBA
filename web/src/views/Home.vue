<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in swiperSlides.items" :key="index">
        <a :href="item.directionUrl" target="blank">
          <img class="swiper-item" :src="item.imageUrl" alt />
        </a>
      </swiper-slide>
      <div class="swiper-pagination swiper-pagination-home" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
/* 请求数据，暂时先这样随便写，以后再整合 */
import axios from "axios";

export default {
  name: "carrousel",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination-home"
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      },
      swiperSlides: null
    };
  },
  methods: {
    async fetch() {
      const http = axios.create({
        baseURL: "http://localhost:3000/web/api"
      });
      const res = await http.get(`rest/ads/5d78f4bdf7ef834778a19a35`);

      this.swiperSlides = res.data;
    }
  },
  created() {
    this.fetch();
  }
  // mounted() {
  //   setInterval(() => {
  //     console.log("simulate async data");
  //     if (this.swiperSlides.length < 10) {
  //       this.swiperSlides.push(this.swiperSlides.length + 1);
  //     }
  //   }, 3000);
  // }
};
</script>

<style lang="scss">
.swiper-item {
  width: 100%;
  height: 10.3125rem;
}
.swiper-pagination-home {
  text-align: right;

  .swiper-pagination-bullet {
    width: 0.5313rem;
    height: 0.5313rem;
    border-radius: 0.125rem;
    background: #fff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background: #4b67af;
  }
}

.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  left: auto;
  bottom: 0.9375rem;
  right: 0.9375rem;
}
</style>