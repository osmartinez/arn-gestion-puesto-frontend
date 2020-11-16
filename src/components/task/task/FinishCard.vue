<template>
    <va-button class="finish" color="success" large @click="finish">TERMINAR</va-button>
</template>

<script>
export default {
  methods:{
    finish(){
      if(this.$store.getters.puesto.EsManual){
        alert('manual')
      }
      else{
        alert('auto')
      }
    }
  }
};
</script>

<style scoped>
.finish {
  width: 100%;
  height: 100%;
  max-height: 400px;
  text-align: center;
  font-size: 40px;
  margin: 1px;
  border-radius: 10px;
}
</style>