```vue
<template>
  <div id="app">
    <DragVerify
      ref="dragVerify"
      description="请将滑块拖动到最右边"
      @onResult="onResult"
    />
    <p>状态: {{ result.code }}</p>
    <p><button @click="reset">还原</button></p>
  </div>
</template>

<script>
import DragVerify from "./components/DragVerify.vue";

export default {
  name: "App",
  components: {
    DragVerify,
  },
  data() {
    return {
      result: "",
    };
  },
  methods: {
    onResult(result) {
      this.result = result;
    },
    reset() {
      this.$refs["dragVerify"].reset();
    },
  },
};
</script>

<style></style>
```
