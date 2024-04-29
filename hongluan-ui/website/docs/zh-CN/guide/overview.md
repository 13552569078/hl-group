# 组件功能概览

Hongluan 是基于 VUE3 开发的一套`响应式` `高可控`的前端框架。它为每一个组件集成了尺寸、间距、状态颜色等语义化类型。<br>
甚至能让你离开 CSS 并且直接在 HTML 标记语言中组合出任意的设计。

:::demo

```html
<hl-panel borderless class="border" header-height="calc(var(--xxs) * 18)" header-class="gap-sm" body-class="p-b-md h-full" footer-class="bg-light p-t-lg border-top">
  <template #header>
    <div class="panel-header-left">
      <hl-icon type="primary" size="md">
        <two-archive />
      </hl-icon>
    </div>
    <div class="panel-title">
      <h5>2021年度城市风险数据收集</h5>
    </div>
    <span class="font-sm text-light m-r-sm">20220318</span>
    <div class="panel-header-right">
      <hl-dropdown>
        <hl-button size="sm" type="primary" effect="light" equal>
          <template #icon>
            <hl-icon><two-more /></hl-icon>
          </template>
        </hl-button>
        <template #dropdown>
          <hl-dropdown-menu>
            <hl-dropdown-item> 查看详情 </hl-dropdown-item>
            <hl-dropdown-item> 删除任务 </hl-dropdown-item>
          </hl-dropdown-menu>
        </template>
      </hl-dropdown>
    </div>
  </template>
  <hl-group dir="vertical" full class="h-full">
    <div class="bg-light text-secondary radius-sm p-y-sm p-x-md">
      请各安委办成员单位组织所辖企业完成2021年度企业风险点数据与应急资源数据的填报工作
    </div>
    <hl-group class="m-t-md p-l-xs static" gap="calc(var(--xs) * 8)">
      <hl-group align="items-middle" gap="var(--sm)">
        <hl-group align="items-middle" gap="var(--xs)">
          <hl-icon size="xs" fill round class="border bg-element text-secondary"><two-briefcase /></hl-icon>
          <span class="text-light">参与机构</span>
        </hl-group>
        <h3>135</h3>
      </hl-group>

      <hl-group align="items-middle" gap="var(--sm)">
        <hl-group align="items-middle" gap="var(--xs)">
          <hl-icon size="xs" fill round class="border bg-element text-secondary"><two-chart-bar /></hl-icon>
          <span class="text-light">已填报数</span>
        </hl-group>
        <h3 style="line-height: unset;">456</h3>
        <hl-icon size="xs" type="info" class="cursor-pointer"><two-info /></hl-icon>
      </hl-group>
    </hl-group>
  </hl-group>
  <template #footer>
    <hl-group align="items-middle" full gap="var(--xl)">
      <hl-tag type="primary" size="lg" class="static">进行中</hl-tag>
      <hl-group dir="vertical" full="full-x" gap="var(--xs)" align="items-middle">
        <hl-group full align="items-between" class="font-sm">
          <hl-group gap="var(--sm)" class="static"><span>结束时间</span><span> 2022.03.15</span></hl-group>
          <span class="static">3天</span>
        </hl-group>

        <hl-progress type="primary" align="right" :percentage="30" stroke-width="var(--xxs)" :show-text="false" />
      </hl-group>
    </hl-group>
  </template>
</hl-panel>
```

:::

## 组件列表

Hongluan 制作了 50+ 常用组件，并且每个组件都拥有高可控的特性

## 布局类

<table class="hl-simple-table hover">
  <thead>
    <tr><th style="width: 210px">组件名称</th><th>功能简介</th></tr>
  </thead>
  <tbody>
    <tr><td>Grid 栅格</td><td>除了将页面拆分为24栅格以外，还支持构建grid布局和flow流布局</td></tr>
    <tr><td>Group 组</td><td>Group组件用于替代你的布局标签。它支持快速调整尺寸，间距或者排列方式</td></tr>
    <tr><td>Panel 面板</td><td>面板用于构建页面的卡片模块，它拥有快速调整尺寸、间距和智能对齐等属性</td></tr>
    <tr><td>Layout 布局</td><td>Layout结构可以通过配置属性来构建一个B端中后台或门户类页面布局</td></tr>
    <tr><td>Typography 排版</td><td>排版不仅是一个组件，它里面集合了大量的工具类，主要用于修饰页面元素的细节</td></tr>
    <tr><td>Icon 图标</td><td>一套支持变换尺寸、颜色、填充色、渐变、甚至路径动画的图标库</td></tr>
    <tr><td>Transition 动画</td><td>内置16+ 种流畅的CSS3动画</td></tr>
    <tr><td>Scrollbar 滚动条</td><td>可以替换浏览器自带的滚动条，而不用担心滚动条占用的页面宽度</td></tr>
  </tbody>
</table>

## 表单类

<table class="hl-simple-table hover">
  <thead>
    <tr><th style="width: 210px">组件名称</th><th>功能简介</th></tr>
  </thead>
  <tbody>
    <tr><td>Button 按钮</td><td>按钮增加了Light淡色和悬停色等状态，用于传达不同级别的交互状态</td></tr>
    <tr><td>Input 输入框</td><td>Input组件的前后分别挂载了“附加结构“，你可以传入任意内容</td></tr>
    <tr><td>Autocomplete 输入建议</td><td>使用Input组件构建，它包含input组件的所有特性</td></tr>
    <tr><td>InputNumber 计数器</td><td>计数器组件使用Group、Button、Input组件组合而成，我们可以通过这些组件的特性来自定义它的样式</td></tr>
    <tr><td>Select 选择器</td><td>使用Input构建，他包含Input所有的特性，例如：圆边、状态颜色、Fill填充等样式</td></tr>
    <tr><td>Selector 高级选择器</td><td>高级选择器的下拉面板拥有开放式的自定义属性，你可以使用图标、图片、甚至视频作为可选项</td></tr>
    <tr><td>Radio 单选框</td><td>Radio可以使用custom属性来将它们设计成任意的样子</td></tr>
    <tr><td>Checkbox 复选框</td><td>Checkbox可以使用custom属性来将它们设计成任意的样子</td></tr>
    <tr><td>Switch 开关</td><td>Switch组件可以设置尺寸、状态颜色等，甚至可以为它加上一个icon图标来增强交互</td></tr>
    <tr><td>Slider 滑块</td><td>Slider组件也支持状态颜色</td></tr>
    <tr><td>Cascader 级联选择器</td><td>需要清晰的表现一个数据集合的层级结构时，可通过级联选择器逐级查看并选择</td></tr>
    <tr><td>TimePicker 时间选择器</td><td>时间选择器也是使用Input组件构建而成，它支持单选、多选、和范围选择</td></tr>
    <tr><td>DatePicker 日期选择器</td><td>日期选择器也是使用Input组件构建而成，它支持单选、多选、和范围选择</td></tr>
    <tr><td>DateTimePicker 日期时间选择器</td><td>日期时间选择器是时间与日期选择器组合而成，同时也拥有这些组件的特性</td></tr>
    <tr><td>Upload 上传</td><td>Upload组件提供了丰富的基础样式，同时还允许你根据上传的文件类型来显示对应的图标</td></tr>
    <tr><td>Transfer 穿梭框</td><td>穿梭框可以进行多选、单选还可以完全自定义穿梭框条目的结构和样式</td></tr>
    <tr><td>Form 表单</td><td>表单组件可以快速调整间距属性同时也是响应式的，它可以根据屏幕的尺寸来自动调整排版样式</td></tr>
  </tbody>
</table>

## 数据类

<table class="hl-simple-table hover">
  <thead>
    <tr><th style="width: 210px">组件名称</th><th>功能简介</th></tr>
  </thead>
  <tbody>
    <tr><td>Table 表格</td><td>Table组件支持固定行和列、数据排序、数据筛选、树形结构和展开详细内容等属性</td></tr>
    <tr><td>SimpleTable 简单表格</td><td>简单表格可以根据浏览器宽度自动收缩每个单元列，同时还能定义为列表的样式</td></tr>
    <tr><td>Tag 标签</td><td>Tag标签支持尺寸、状态颜色的个性化定义</td></tr>
    <tr><td>Badge 徽章</td><td>Badge组件是依附在其它组建的内部，我们可以修饰它的样式和显示的位置</td></tr>
    <tr><td>Progress 进度条</td><td>进度条组件支持堆叠展示，还可以定义成仪表盘一样的环形样式</td></tr>
    <tr><td>Tree 树形控件</td><td>树组件支持自定义图标、关键词过滤和拖拽排序功能</td></tr>
    <tr><td>Pagination 分页</td><td>Pagination组件可以定义展示的样式和排列方式</td></tr>
    <tr><td>Popover 气泡弹框</td><td>气泡组件可以设置light和dark颜色，并且兼具Tooltip功能</td></tr>
  </tbody>
</table>

## 通知提示类

<table class="hl-simple-table hover">
  <thead>
    <tr><th style="width: 210px">组件名称</th><th>功能简介</th></tr>
  </thead>
  <tbody>
    <tr><td>Alert 警告</td><td>Alert组件可以设置状态颜色、light颜色和自定义布局</td></tr>
    <tr><td>Spinner 加载状态</td><td>Spinner组件提供了丰富的loading样式，支持状态反馈的结果提示，同时还可以控制它的旋转速度和方向</td></tr>
    <tr><td>Loading 加载</td><td>可以自定义加载的图标和遮罩的颜色</td></tr>
    <tr><td>MessageBox 操作提示窗</td><td>MessageBox组件可以自定义样式和动画</td></tr>
    <tr><td>Message 消息弹窗</td><td>Message可以根据返回的状态来显示不同颜色和图标，同时还允许自定义内容</td></tr>
    <tr><td>Notification 通知</td><td>Notification组件可以根据返回的状态来显示不同颜色和图标，同时还允许自定义内容</td></tr>
    <tr><td>Dialog 弹窗</td><td>弹窗组件可以选择动画组件里的所有动画效果</td></tr>
  </tbody>
</table>

## 导览类

<table class="hl-simple-table hover">
  <thead>
    <tr><th style="width: 210px">组件名称</th><th>功能简介</th></tr>
  </thead>
  <tbody>
    <tr><td>List 列表</td><td>List组建通常用于展现多列数据或者排名等</td></tr>
    <tr><td>Affix 固钉</td><td>可以固定某个元素在滚动页面时，不超出可视范围</td></tr>
    <tr><td>Dropdown 下拉菜单</td><td>任意元素都可以调用Dropdown组件，同时也可以自定义展示的内容例如为每个项目增加一个ICON图标</td></tr>
    <tr><td>Menu 导航菜单</td><td>Menu组件通常用于制作网页的导航、侧栏导航等，它能根据浏览器宽度自动折叠</td></tr>
    <tr><td>Tabs 标签页</td><td>Tabs组件可以动态增加条目，也可以自定义图标来增强交互</td></tr>
    <tr><td>Breadcrumb 面包屑</td><td>面包屑组件可以自定义它的分割线样式</td></tr>
    <tr><td>Steps 步骤条</td><td>步骤条组件可以展示为横向排列和纵向排列的方式，而且还能设置每个条目的状态颜色和图标样式</td></tr>
    <tr><td>Carousel 走马灯</td><td>支持自动滚动、手动滚动、缩略图方式、卡片交替样式</td></tr>
    <tr><td>Collapse 折叠面板</td><td>Collapse可以自定义每个项目的间距和内容</td></tr>
    <tr><td>Timeline 时间轴</td><td>时间轴组件可选择左、右、居中、交替排列等样式，可使用ICON来增强锚点表现，还可完全自定义每个条目的内容和板式</td></tr>
  </tbody>
</table>

## 其它

<table class="hl-simple-table hover">
  <thead>
    <tr><th style="width: 210px">组件名称</th><th>功能简介</th></tr>
  </thead>
  <tbody>
    <tr><td>Calendar 日历</td><td>日历组件可以自定义每个单元格的内容</td></tr>
    <tr><td>Thumb 缩略图</td><td>Thumb组件不仅用于展示图片，还可以用于展示头像、名称头像等</td></tr>
    <tr><td>Backtop 回到顶部</td><td>用于返回页面顶部的操作按钮，可以完全自定义它的样式</td></tr>
    <tr><td>InfiniteScroll 无限滚动</td><td>在不翻页的情况下，滚动至底部时加载更多数据，数据的内容完全自定义</td></tr>
  </tbody>
</table>


