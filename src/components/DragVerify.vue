<template>
  <div>
    <div id="drag-verify">
      <div id="slideway"></div>
      <div class="slideway-text" onselectstart="return false;" unselectable="on">
        {{ description }}
      </div>
      <div id="handler" class="handler handler-icon-init"></div>
    </div>
  </div>
</template>

<script>
import DragVerify from "./DragVerify";

export default {
  name: "DragVerify",
  props: {
    description: {
      type: String,
      default: "拖动滑块验证",
    },
  },
  data() {
    return {
      dragVerify: null,
    };
  },
  mounted() {
    this.dragVerify = new DragVerify(
      () => {
        this.$emit("onResult", { code: 200, message: "验证通过!" });
      },
      () => {
        this.$emit("onResult", { code: 0, message: "未验证!" });
      }
    );
  },
  methods: {
    reset() {
      this.dragVerify.reset();
    },
  },
};
</script>

<style scoped>
#drag-verify {
  position: relative;
  background-color: #e8e8e8;
  width: 300px;
  height: 34px;
  line-height: 34px;
  text-align: center;
}
#drag-verify .handler {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 40px;
  height: 32px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.2s ease;
}
.handler-icon-init {
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAALNJREFUWEft1sENgzAMBVBItuk+ZZIoZ66xMgndp+NEle+I2Ja/0oM5Qsh/fGQp+7b42hfnbwGIBv6/gdbamXO+Sinfu4khojffr7V+LBP12EDv/TXGuHjjlNJxhyAifs6Iw4KY/gI0Ygrgr0ciRAAkQgxAIVQABEIN8EaYAJ4IE8BzKtQAz3BuUgXwDlcBEOFiACpcBECGTwHo8CmAFyw9D1gOGNp3VGOo3VyyPgDRQDTwA8Qr1SGOkJt6AAAAAElFTkSuQmCC")
    no-repeat center;
}
.handler-icon-pass {
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAnZJREFUWEfVl7Fr1HAUxz8vPWvBqeBiN930hpPL6eBU6FIFQcVWXOpSk02kjg7eLZ1cRFQudLC63Q2Cyw36D2ibDMJZxIJb6+YgUimYn9yZg1ySX5JLT0qz/vK+38/vvfd7+UU45EcO2Z+jB7DQYnL6DLNKmEFxSoSfStg1YKtZ5fOoGc2dAdtl3lfcFmERmEo0Eroo3pXg2XOT7TwwmQC2R8X3WRFhKY9g/x3FdzFYbVZ5mhWTCrC8waxh0AZOZglp1juOyZW0WC2A7XFOKboFjYfCHFPf7IkAgflH4MQ4ABDaTrXfO7EnEcBy6QDzBzL3aTDBTRTlQOehY7Ia1YwB2B5LSrF+UHPnAvV+JqEVQGz9mOJ8u8x+WDsJ4INSXCwM4NPomffiIwCIcKdZ5ZUWYNnFNGDzf5j3NAXeNE1uaAGsDeoYPCoEkLLzsF70RAyVwHJpAtYQQLyZ4nw5zYMhNePU2B2IRAHeAldDDnXHpBGtZRRQV/OkTPpQWzNx8wFk7SxrPYEgCyCxBIk7LGCeXQJdE0bN/rA4StpzN2HqMQxBDARTeyN57sZGcmwQWW7/UnE28SgWTXsgJmA3TZzUSWh5PEDxWDsLfBoyQSs0YvOOjR0UtfARDIZTPN5yeQ/MaZX/3XwGH5l8AAkl1ALYHnNK9SHG8wjd/WlqL0/zOyqovZBYHvdQPBkHgQhl3YU19UpmbbKA0CoMofjiH+PyWoVvOo3MS2kAcR+4NCKIs1di5XWFX2lxmQCD4Lsu1wVuIVxDcTxJVME2io4S1sPzfiwAA5F6l8mdvfiPSUnx9YXJpxGzdAR/zUbdYdb7uXsgS6jo+l8KUxAwNFONPgAAAABJRU5ErkJggg==")
    no-repeat center;
}
#drag-verify #slideway {
  background-color: #7ac23c;
  height: 34px;
  width: 0px;
  transition: all 0.2s ease;
}
#drag-verify .slideway-text {
  position: absolute;
  top: 0px;
  width: 300px;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
}
.unselect {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.drag-verify-pass {
  color: #fff;
}
</style>
