<template>
  <transition name="modal-fade">
    <div v-if="isVisible" class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal-content">
        <button class="modal-close-button" @click="$emit('close')">&times;</button>
        <h3 class="modal-header">游戏帮助</h3>
        <div class="modal-body">
          <h1>游戏玩法非常的简单：</h1>
          <ul>
            <li>
              <strong>目标</strong>：通过输入化合物分子式(如NaCl,不区分大小写),猜测正确化合物。
            </li>
            <li>
              <strong>操作</strong>：
              <ul>
                <li>点击“刷新”重置游戏</li>
                <li>点击“随机”展示随机化学式</li>
                <li>点击“揭晓”显示正确答案。</li>
                <li>点击“提交”提交随机化学式或你输入的化学式</li>
              </ul>
            </li>
            <li>
              <strong>格子说明</strong>：
              <ul>
                <li>元素格子(黑色10个)：显示你输入的化合物的元素</li>
                <ul>
                  <li>化学式中的根离子是多字符的且数量是多个的需要带括号</li>
                  <li>字母，数字，括号各占一个格子</li>
                  <li>例如<img class="center" src="./imgs/Al2(SO4)3.png" alt="化学式" /></li>
                  <li>
                    <img
                      src="./imgs/C.png"
                      alt="绿色"
                    />绿色表示该元素在正确答案中出现过，且位置相同。
                  </li>
                  <li>
                    <img
                      src="./imgs/H.png"
                      alt="黄色"
                    />黄色表示该元素在正确答案中出现过，但位置不同。
                  </li>
                  <li>
                    <img src="./imgs/O.png" alt="灰色" />灰色表示该元素在正确答案中没有出现过。
                  </li>
                </ul>
                <li>状态格子(红色1个)：显示你输入的化合物的常温状态(25℃)</li>
                <ul>
                  <li><img src="./imgs/Q.png" alt="气体" />绿色的常温状态表示和正确答案一样。</li>
                  <li><img src="./imgs/Y.png" alt="液体" />灰色的常温状态表示和正确答案不同。</li>
                </ul>
                <li>MW格子(黄色1个)：显示化合物的分子量。</li>
                <li>分子量比较格子(黄色1个)：显示大了或小了</li>
                <ul>
                  <li>小了表示猜测的分子量小于答案的分子量。</li>
                  <li>大了表示猜测的分子量大于答案的分子量。</li>
                </ul>
              </ul>
            </li>
            <li>
              <strong>提示</strong>：
              <ul>
                <li>你有20次猜测机会，合理利用字符颜色和分子量对比来猜出正确答案！</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close'], // Vue 2 doesn't strictly use emits declaration but good practice
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; /* Higher than notification */
}

.modal-content {
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 600px;
  max-height: 80vh; /* Limit height */
  overflow-y: auto; /* Allow scrolling if content overflows */
  position: relative;
}

.modal-header {
  margin-top: 0;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  text-align: center;
}
.modal-body h4 {
  margin-top: 15px;
  margin-bottom: 5px;
}
.modal-body ul {
  padding-left: 20px;
  margin-bottom: 10px;
}
.modal-body li {
  margin-bottom: 5px;
}
.modal-body ul ul {
  padding-left: 15px;
  margin-top: 5px;
}

.modal-close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  color: #aaa;
  cursor: pointer;
  padding: 0;
}
.modal-close-button:hover {
  color: #777;
}

/* Color boxes for legend */
.color-box {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 5px;
  border: 1px solid #ccc;
  vertical-align: middle;
}
.color-text {
  vertical-align: middle;
}
.green {
  background-color: #4caf50;
}
.yellow {
  background-color: #ffff3b;
}
.gray {
  background-color: #d7d7d7;
}
img {
  vertical-align: middle;
  width: 25px;
  height: 25px;
}
.center {
  vertical-align: middle;
  width: 272px;
  height: 25px;
}

@media screen and (max-width: 650px) {
  .modal-content {
    padding: 20px 15px;
    max-height: 85vh;
  }
  .modal-header {
    font-size: 1.2rem;
  }
  .modal-body {
    font-size: 0.9rem;
  }
}
</style>
