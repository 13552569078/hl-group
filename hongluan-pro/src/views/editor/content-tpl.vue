<template>
  <div class="right-module common-box" style="margin-top:calc(var(--xl) + var(--xxs) + var(--md))">
    <p><span>模版列表</span><span class="iconfont fwxialaxuanze"></span></p>
    <div class="item-content">
      <div v-for="item of data" :key="item.title" class="item">
        <span class="item-name">{{ item.title }}</span>
        <hl-icon class="cursor-pointer" @click="handleInsert(item)">
          <two-plus />
        </hl-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

interface Item {
  command: string
  title: string
  htmlStr: string
}


export default defineComponent({
  emits: ['click'],
  setup(_, { emit }) {
    const data: Item[] = [
      {
        command: 'InsertTeam',
        title: '参与队伍',
        htmlStr:
        `<p><strong>队伍名称：</strong></p>
        <p><strong>成员：</strong></p>
        <table class="editor-module-table" style="border-collapse: collapse; width: 100%; border: 1px solid #E2E4EA;" border="1">
          <tbody>
            <tr style="height: 36px; background: #F5F7FB;">
              <td style="width: 31.7422%; padding: 6px">姓名</td>
              <td style="width: 31.7422%; padding: 6px">职务</td>
              <td style="width: 31.8523%; padding: 6px">电话</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 31.7422%; padding: 6px"></td>
              <td style="width: 31.7422%; padding: 6px"></td>
              <td style="width: 31.8523%; padding: 6px"></td>
            </tr>
          </tbody>
        </table>`,
      },
      {
        command: 'InsertExpert',
        title: '参与专家',
        htmlStr:
        `<p><strong>参与专家：</strong></p>
        <table class="editor-module-table" style="border-collapse: collapse; width: 100%; border: 1px solid #E2E4EA;" border="1">
          <tbody>
            <tr style="height: 36px; background: #F5F7FB;">
              <td style="width: 31.7422%; padding: 6px">姓名</td>
              <td style="width: 31.7422%; padding: 6px">单位</td>
              <td style="width: 31.8523%; padding: 6px">电话</td>
            </tr>
            <tr style="height: 36px;">
              <td style="width: 31.7422%; padding: 6px"></td>
              <td style="width: 31.7422%; padding: 6px"></td>
              <td style="width: 31.8523%; padding: 6px"></td>
            </tr>
          </tbody>
        </table>`,
      },
      {
        command: 'InserEvent',
        title: '事件后果',
        htmlStr:
        `<p><strong>事件后果：</strong></p>
        <br/>
        <p>死亡/遇难人数：0人；&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 失踪人数：0人；</p>
        <p>重伤/致残人数：0人；&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 轻伤/感染人数：0人；</p>
        <p>转移/安置人数：0人；&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 受波及影响人数：0人；</p>
        <p>直接经济损失：无。</p>
        <p>间接经济损失：无。</p>
        <p>社会舆论影响：无。</p>
        <p>其他影响：无。</p>
        `,
      },
      {
        command: 'InsertStrategy',
        title: '处置策略/相应措施',
        htmlStr: ``,
      },
    ]

    const handleInsert = (item: Item) => {
      emit('click', item.htmlStr)
    }

    return {
      data,
      handleInsert,
    }
  },
})
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.right-module {
  width: 100%;
  height: 368px;
  padding: 16px;
  box-shadow: 0px 0px 30px 0px rgba(82, 63, 105, 0.05);
  border-radius: 6px;
  .iconfont {
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    &:hover {
      background-color: #e7f0ff;
    }
  }
  p {
    width: 100%;
    font-weight: bold;
    color: #39486b;
    // -webkit-text-stroke: 1px #979797;
    font-size: 16px;
    line-height: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    .fwxialaxuanze {
      font-size: 12px;
      color: #7280a0;
    }
  }
  .item-content {
    width: 100%;
    overflow: hidden;
    .item {
      width: 100%;
      height: 16px;
      line-height: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      .item-name {
        color: #5d6c8e;
        font-size: 14px;
      }
      .icon {
        font-size: 12px;
        color: #5d6c8e;
      }
    }
  }
}
</style>
