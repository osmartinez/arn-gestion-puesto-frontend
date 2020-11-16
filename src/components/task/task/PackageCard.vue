<template>
  <va-card class="package">
      <h1 class="h1">{{count}}/{{total}}</h1>
  </va-card>
</template>

<script>
export default {
  data: function(){
    return{
      count: 0,
      total: 5,
    }
  }
};
</script>

<style scoped>
.package {
  width: 100%;
  height: 100%;
  max-height: 400px;
  text-align: center;
  font-size: 100px;
}
</style>