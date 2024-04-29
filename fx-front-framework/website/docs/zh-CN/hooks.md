# Hooks

## useMaxScreen
屏幕最大/最小化

```ts
useMaxScreen(): {
  isMaxScreen: Ref<boolean>
  changeFullScreen: () => void
}
```

## useRenderChart
自动刷新图表数据

```ts
useRenderChart(
  cb: () => void, // 回调函数
  data: Ref<unknown> | Indexable<any>, // watch的数据，Ref或者Reactive
  field = 'chartData' // 如果data为Reactive，需要传入此值，表示watch哪个字段
): void
```

## useResponsiveChart
把echart相关字段数值按照屏幕大小进行像素转换。使用此组件库时，需要配置InstallOptions里面的visudalizd.basisPX

```ts
useResponsiveChart(): {
  updateOptionToResponsive: (option: any, keyArr: string[] = defaultAttributes) => void
  defaultAttributes: string[] // 默认转换echart option中的字段
}
```

```ts
const defaultAttributes = ['lineHeight','margin','fontSize','left','right','top','bottom','padding','itemWidth','itemHeight',
'itemGap','symbolSize','width','height','barMaxWidth']
```

## useTextTimer
自动刷新的当前时间字符串

```ts
useTextTimer(): {
  dates: Ref<string> // 2009年09月08日
  day: Ref<string> // 星期一
  times: Ref<string> // 23:34:23
  fullDatetime: ComputedRef<string> // 2009年09月08日 23:34:23 星期一
}
```

## usePageConfig
页面一些常用配置

```ts
useTele(): {
  showTeleport: Ref<false> // 默认为false，页面加载完设为true
}
```

## useIframe
判断页面是否嵌入到了iframe中

```ts
useIframe(): {
  isIframe: Ref<boolean> // 默认为false，页面加载完设为true
}
```

## usePreviewer
预览图片或者视频

```ts
usePreviewer(): {
  openPreviewer: (item: PreviewItem, limitNum?: number | null, initVideoWidth = '500px') //
}
```
```ts
export interface PreviewItem {
  id: string
  name: string
  url: string
  sourceType: 1 | 2 // 1: img, 2: video,
}
```
