<template>
  <div class="help">
    <h1>游戏玩法非常的简单：</h1>
    <ul>
      <li><strong>目标</strong>：通过输入化合物分子式(如NaCl,不区分大小写),猜测正确化合物。</li>
      <li>
        <strong>操作</strong>：
        <ul>
          <li>输入化合物的化学式后按回车或点击“提交”。</li>
          <li>点击“刷新”重置游戏</li>
          <li>点击“揭晓”显示正确答案。</li>
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
              <img src="./imgs/C.png" alt="绿色" />绿色表示该元素在正确答案中出现过，且位置相同。
            </li>
            <li>
              <img src="./imgs/H.png" alt="黄色" />黄色表示该元素在正确答案中出现过，但位置不同。
            </li>
            <li><img src="./imgs/O.png" alt="灰色" />灰色表示该元素在正确答案中没有出现过。</li>
          </ul>
          <li>常温状态格子(红色1个)：显示你输入的化合物的常温状态(25℃)</li>
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
    <button @click="$router.push('/')">返回游戏</button>
  </div>
</template>

<style scoped>
.help {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  text-align: left;
}
h1 {
  text-align: center;
}
.center {
  vertical-align: middle;
  width: 272px;
  height: 25px;
}
img {
  vertical-align: middle;
  width: 25px;
  height: 25px;
}
button {
  display: block;
  margin: 20px auto;
  padding: 10px 60px;
  cursor: pointer;
  background-color: green;
  color: #ffffff;
  border-radius: 30px;
}
@media screen and (max-width: 650px) {
  .center {
    vertical-align: middle;
    width: 185px;
    height: 17px;
  }
  img {
    vertical-align: middle;
    width: 17px;
    height: 17px;
  }
}
</style>
