/**
 * 参考项目: https://github.com/Dreams-d/SliderTools
 */
class Bus {
  constructor() {
    this.callbacks = {};
  }

  on(name, fn) {
    this.callbacks[name] = this.callbacks[name] || [];
    this.callbacks[name].push(fn);
  }

  emit(name, args) {
    if (this.callbacks[name]) {
      this.callbacks[name].forEach((callback) => {
        callback(args);
      });
    }
  }
}

export default class DragVerify {
  constructor(complete, reset) {
    this.template = document.querySelector("#drag-verify");
    this.dragbg = document.querySelector("#drag-bg");
    this.handler = document.querySelector("#handler");
    this.bus = new Bus();
    this.initEvents();
    complete && this.bus.on("complete", complete);
    reset && this.bus.on("reset", reset);
  }

  onComplete(fn) {
    this.bus.on("complete", fn);
  }

  onReset(fn) {
    this.bus.on("reset", fn);
  }

  // 初始化监听事件
  initEvents() {
    let self = this;
    this.handler.onmousedown = function(e) {
      self.down(e);
      document.onmousemove = (e) => self.move(e);
      document.onmouseup = (e) => self.up(e);
    };
    this.handler.ontouchstart = function(e) {
      self.down(e);
      document.ontouchmove = (e) => self.move(e);
      document.ontouchend = (e) => self.up(e);
    };
  }

  // 按下处理
  down(e) {
    this.diffX = 0;
    this.cancelTransition();
    let clientX = 0; // 按下点到最左侧的距离
    if (e.type == "touchstart") {
      clientX = e.changedTouches[0].clientX;
    } else if (e.type == "mousedown") {
      clientX = e.clientX;
    }
    this.diffX = clientX - this.handler.offsetLeft;
  }

  // 移动处理
  move(e) {
    // 移动到的点距离初始按下时点的距离
    let clientX = 0;
    if (e.type == "touchmove") {
      clientX = e.changedTouches[0].clientX;
    } else if (e.type == "mousemove") {
      clientX = e.clientX;
    }
    let moveX = clientX - this.diffX;
    if (moveX >= this.template.offsetWidth - this.handler.offsetWidth) {
      moveX = this.template.offsetWidth - this.handler.offsetWidth;
    } else if (moveX <= 0) {
      moveX = 0;
    }
    // 实时更新移动的距离
    this.updateDistance(moveX);
  }

  // 抬起事件
  up(e) {
    let clientX = 0;
    if (e.type == "touchend") {
      clientX = e.changedTouches[0].clientX;
      document.ontouchmove = null;
      document.ontouchend = null;
    } else if (e.type == "mouseup") {
      clientX = e.clientX;
      document.onmousemove = null;
      document.onmouseup = null;
    }

    this.addTransition();
    if (clientX >= this.template.offsetWidth) {
      this.complete();
    } else {
      this.reset();
    }
  }

  // 验证成功
  complete() {
    this.template.className = "drag-verify-pass";
    this.handler.classList.add("handler-bg-pass");
    this.handler.onmousedown = null;
    this.handler.ontouchstart = null;
    this.bus.emit("complete");
  }

  // 恢复原始状态
  reset() {
    this.handler.classList.remove("handler-bg-pass");
    this.updateDistance(0);
    this.initEvents();
    this.bus.emit("reset");
  }

  // 更新移动距离
  updateDistance(x = 0) {
    this.updateStyle([this.handler], "left", x + "px");
    this.updateStyle([this.dragbg], "width", x + "px");
  }

  // 添加动画
  addTransition() {
    this.template.className = "";
    this.updateStyle([this.handler, this.dragbg], "transition", "all .2s ease");
  }

  // 取消动画
  cancelTransition() {
    this.template.className = "unselect";
    this.updateStyle([this.handler, this.dragbg], "transition", "none");
  }

  // 更新样式
  updateStyle(selector, attr, content) {
    selector.forEach((item) => {
      item.style[attr] = content;
    });
  }
}
