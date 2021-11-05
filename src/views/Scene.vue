<template>
  <div class="scene">
    <canvas />
  </div>
</template>

<script lang="ts">
import * as THREE from "three";

export default {
  name: "Scene",
  //渲染器
  rederer: new THREE.WebGLRenderer({
    canvas: document.createElement("canvas"),
  }),
  // 场景
  scene: new THREE.Scene(),

  props: {},

  components: {},
};
</script>


<style scoped lang="less">
</style>