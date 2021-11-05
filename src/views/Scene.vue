<template>
  <div class="scene">
    <canvas ref="canvas" />
  </div>
</template>

<script lang="ts">
import * as THREE from "three";

export default {
  name: "Scene",
  //渲染器
  rederer: THREE.WebGLRenderer,
  // 场景
  scene: new THREE.Scene(),

  camera: new THREE.PerspectiveCamera(50, 1, 1, 2000), //创建透视相机

  mounted() {
    // 渲染器
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.$refs.canvas as HTMLCanvasElement,
    });
  },
  props: {},

  components: {},
};
</script>


<style scoped lang="less">
</style>