<template>
  <div>
    <canvas />
  </div>
</template>

<script lang="ts">
import * as THREE from "three";

export default {
  name: "Renderer",
  //渲染器
  rederer: new THREE.WebGLRenderer({}),
  // 场景
  scene: new THREE.Scene(),

  props: {},
  provide: {
    message: "demo",
  },
  inject: ["message"],
  components: {},
};
</script>


<style scoped lang="less">
</style>