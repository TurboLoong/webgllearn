<template>
  <div class="scene" ref="scene">
    <canvas class="canvas" ref="canvas" />
  </div>
</template>

<script lang="ts">
import elementResizeEvent from "element-resize-event";
import * as THREE from "three";
import { defineComponent } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

window.THREE = THREE;

interface Props {}

interface RawBindings {
  isUnMoment: boolean; // 是否卸载
  renderer: THREE.WebGLRenderer; // 渲染器
  scene: THREE.Scene; // 渲染器
  camera: THREE.PerspectiveCamera; // 透视相机对象 有近大远小的效果
  cubeMesh: THREE.Mesh; // 立方体模型对象
  orbitControls: OrbitControls;
}

interface Method {
  init: () => void;
  onresize: () => void;
  animate: () => void;
}

export default defineComponent<Props, RawBindings, Method>({
  components: {},
  // props: {
  //   value: {
  //     type: Array,
  //     required: true,
  //   },
  // },
  datas: {},

  emits: [],

  methods: {
    init() {
      // 创建渲染器对象
      this.renderer = new THREE.WebGLRenderer({
        // alpha: true, // 透明背景
        antialias: true, // 抗锯齿
        precision: "highp", //precision:highp/mediump/lowp着色精度选择
        canvas: this.$refs.canvas as HTMLCanvasElement,
      });

      // 创建场景对象
      this.scene = new THREE.Scene();

      this.scene.add(new THREE.AxesHelper(10)); // 在场景中添加 xyz 轴

      this.scene.add(new THREE.GridHelper(10)); // 在场景中添加 xyz 轴

      // 设置渲染器的分辨率
      this.renderer.setPixelRatio(window.devicePixelRatio);

      // 创建一个相机对象
      this.camera = new THREE.PerspectiveCamera(70, 1, 0.01, 10000);

      //轨道控制器 使用鼠标控制相机
      this.orbitControls = new OrbitControls(
        this.camera,
        this.$refs.scene as HTMLDivElement
      );

      // 设置相机的位置
      this.camera.position.set(0, 0, 5);

      //相机看向场景的中心
      this.camera.lookAt(this.scene.position);

      // 创建一个网格模型, 网格模型是可以复用的, 包含的模型所有的顶点信息
      let geometry = new THREE.BoxBufferGeometry(1, 1, 1, 1, 1, 1);

      // 创建法线材质 这个材质主要用于调试模型用, 根据法线方向着色
      let material = new THREE.MeshNormalMaterial();

      // 创建一个立方体模型对象 使用立方体网格模型 和 法线材质
      this.cubeMesh = new THREE.Mesh(geometry, material);

      // 把 模型对象添加到 场景中
      this.scene.add(this.cubeMesh);
    },
    onresize() {
      let rect = (this.$refs.scene as HTMLDivElement).getBoundingClientRect();
      let width = Math.ceil(rect.width);
      let height = Math.ceil(rect.height);
      let aspect = width / height;
      this.camera.aspect = aspect; // 调整相机对象的宽高比参数
      this.camera.updateProjectionMatrix(); // 更新相机的投影矩阵
      this.renderer.setSize(width, height); // 修改渲染器的尺寸
    },
    animate() {
      this.cubeMesh.rotation.x += 0.01; // 修改 x 旋转

      this.cubeMesh.rotation.y += 0.02; // 修改 y 旋转

      this.renderer.render(this.scene, this.camera); // 渲染整个场景

      // 组件没有卸载的时候才继续递归执行
      if (!this.$.isUnmounted) {
        requestAnimationFrame(this.animate);
      }
    },
  },

  mounted() {
    this.init();
    this.onresize();
    elementResizeEvent(this.$refs.scene as HTMLDivElement, this.onresize); // 监听dom 的尺寸改变
    this.animate();
  },

  setup(props, contex) {
    // 安装
    // console.log(props);
    // console.log(contex);
  },
  unmounted() {
    //     // 组件卸载时清理渲染器占用的内存
    this.renderer.forceContextLoss();
  },
});
</script>

<style scoped lang="less">
.scene {
  width: 80%;
  height: 600px;
  margin: 0 auto;
  .canvas {
    border: 1px #ccc solid;
  }
}
</style>
