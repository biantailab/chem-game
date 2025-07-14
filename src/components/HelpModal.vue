<template>
  <transition name="modal-fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[1050]"
      @click.self="$emit('close')"
    >
      <div
        class="bg-white p-6 md:p-8 rounded-lg shadow-lg w-[90%] max-w-[600px] max-h-[80vh] overflow-y-auto relative"
      >
        <button
          class="absolute top-2.5 right-4 bg-none border-none text-3xl leading-none text-gray-400 hover:text-gray-600 cursor-pointer"
          @click="$emit('close')"
        >
          &times;
        </button>
        <h3 class="mt-0 mb-4 border-b border-gray-200 pb-2 text-center text-xl font-bold">
          游戏帮助
        </h3>
        <div class="text-base">
          <h1 class="text-lg font-semibold mb-3">游戏玩法非常的简单：</h1>
          <ul class="pl-5 mb-2 space-y-2">
            <li>
              <strong>目标</strong>：通过输入化合物分子式(如NaCl,不区分大小写),猜测正确化合物。
            </li>
            <li>
              <strong>操作</strong>：
              <ul class="pl-4 mt-1 space-y-1">
                <li>点击“刷新”重置游戏</li>
                <li>点击“随机”展示随机化学式</li>
                <li>点击“揭晓”显示正确答案。</li>
                <li>点击“提交”提交随机化学式或你输入的化学式</li>
              </ul>
            </li>
            <li>
              <strong>格子说明</strong>：
              <ul class="pl-4 mt-1 space-y-1">
                <li>元素格子(黑色10个)：显示你输入的化合物的元素</li>
                <ul class="pl-4 mt-1 space-y-1">
                  <li>化学式中的根离子是多字符的且数量是多个的需要带括号</li>
                  <li>字母，数字，括号各占一个格子</li>
                  <li>
                    例如
                    <img
                      class="inline align-middle w-[272px] h-6"
                      src="@/assets/imgs/Al2(SO4)3.png"
                      alt="化学式"
                    />
                  </li>
                  <li>
                    <img class="inline align-middle w-6 h-6" src="@/assets/imgs/C.png" alt="绿色" />
                    绿色表示该元素在正确答案中出现过，且位置相同。
                  </li>
                  <li>
                    <img class="inline align-middle w-6 h-6" src="@/assets/imgs/H.png" alt="黄色" />
                    黄色表示该元素在正确答案中出现过，但位置不同。
                  </li>
                  <li>
                    <img class="inline align-middle w-6 h-6" src="@/assets/imgs/O.png" alt="灰色" />
                    灰色表示该元素在正确答案中没有出现过。
                  </li>
                </ul>
                <li>状态格子(红色1个)：显示你输入的化合物的常温状态(25℃)</li>
                <ul class="pl-4 mt-1 space-y-1">
                  <li>
                    <img
                      class="inline align-middle w-6 h-6"
                      src="@/assets/imgs/Q.png"
                      alt="气体"
                    />绿色的常温状态表示和正确答案一样。
                  </li>
                  <li>
                    <img
                      class="inline align-middle w-6 h-6"
                      src="@/assets/imgs/Y.png"
                      alt="液体"
                    />灰色的常温状态表示和正确答案不同。
                  </li>
                </ul>
                <li>MW格子(黄色1个)：显示化合物的分子量。</li>
                <li>分子量比较格子(黄色1个)：显示大了或小了</li>
                <ul class="pl-4 mt-1 space-y-1">
                  <li>小了表示猜测的分子量小于答案的分子量。</li>
                  <li>大了表示猜测的分子量大于答案的分子量。</li>
                </ul>
              </ul>
            </li>
            <li>
              <strong>提示</strong>：
              <ul class="pl-4 mt-1 space-y-1">
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
