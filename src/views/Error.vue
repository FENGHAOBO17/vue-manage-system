<template>
    <div>
      <!-- <div style="height: 50px;"></div> -->
      <div style="text-align: center;margin-top: 50px; font-size: 26px;">
        まだログインしてないです
      </div>
      <div style="text-align: center;margin-top: 50px;">
        こちらから.<a href="#" @click="logout" class="custom-link">ログイン</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // 在此处添加您的数据属性
      };
    },
    methods: {
      logout() {
        window.location.href = '/#/'
      },
    },
  };
  </script>


<style>
  .custom-link {
    color: black;
    text-decoration: none;
  }

  .custom-link:hover {
    color: blue;
    text-decoration: underline;
  }
</style>