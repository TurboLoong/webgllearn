<template>
  <div class="scene">
    <canvas class="canvas" ref="canvas" />
  </div>
</template>

<script lang="ts">
import * as THREE from "three";
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  // props: {
  //   value: {
  //     type: Array,
  //     required: true,
  //   },
  // },
  emits: [],

  methods: {
    init() {
      // 获取容器
      let container = document.getElementById("container")!;

      //获取容器的尺寸
      const { clientWidth: width, clientHeight: height } = container;

      // 创建渲染器对象
      this.renderer = new THREE.WebGLRenderer({ antialias: true });

      // 更具容器的尺寸大小 调整渲染器的尺寸
      this.renderer.setSize(container.clientWidth, container.clientHeight);

      // 设置渲染器的分辨率
      this.renderer.setPixelRatio(window.devicePixelRatio);

      // 把渲染器对象的 canvas dom 放到页面上
      container.appendChild(this.renderer.domElement);

      // 创建一个场景对象
      this.scene = new THREE.Scene();

      // 创建一个相机对象
      this.camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);

      // 设置相机的位置
      this.camera.position.set(0, 0, 10);

      // 相机看向场景的中心
      this.camera.lookAt(this.scene.position);

      //创建一个网格模型, 网格模型是可以复用的, 包含的模型所有的顶点信息
      let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);

      // 创建法线材质 这个材质主要用于调试模型用, 根据法线方向着色
      let material = new THREE.MeshNormalMaterial();

      // 创建一个模型对象 使用立方体网格模型 和 法线材质
      this.mesh = new THREE.Mesh(geometry, material);

      // 把 模型对象添加到 场景中
      this.scene.add(this.mesh);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    },
  },

  setup(props, contex) {
    this.init();
    this.animate();
    debugger;
    console.log(props);
    console.log(contex);
    // 安装
  },
  unmounted() {
    //     // 组件卸载时清理渲染器占用的内存
    this.renderer.forceContextLoss();
  },
});
</script>

<style scoped lang="less">
.scene {
  .canvas {
    border: 1px #ccc solid;
  }
}
</style>
