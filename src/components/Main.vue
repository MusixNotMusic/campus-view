<template>
    <div class="main-view" ref="mainViewerRef"></div>
  </template>
  
  <script>
  import { onMounted, onUnmounted, ref } from 'vue';
//   import Campus3DScene from '../core/Campus3DScene.js'
  import Viewer from '../core/Viewer.js'
  export default {
    name: 'MainView',
    setup() {
        const mainViewerRef = ref(null);
        let instance;
        onMounted(() => {
            instance = new Viewer(mainViewerRef.value, { preset: 'assetgenerator'});
            instance.load('/model/compus.glb')
        })

        onUnmounted(() => {
            if(instance && instance.dispose) instance.dispose();
        })

        return {
            mainViewerRef
        }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .main-view{
    width: 100vw;
    height: 100vh;
  }
  </style>
  