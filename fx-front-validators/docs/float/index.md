## int（整数相关校验规则）

### isInt

```ts
function isInt(msg = '此字段需要填写整数', opts: Record<string, any> = {})
```

### intRange
```ts
// 验证整数范围，默认范围前开后闭
function intRange(
  min: number | null | undefined | { val: number; open: boolean; },
  max: number | null | undefined | { val: number; open: boolean; },
  msg: string,
  opts: Record<string, any> = {}
)
```

### 示例

<script setup>
import '../../node_modules/hongluan-ui/dist/index.css'
import Demo from './demo.vue'
</script>

<br ><Demo /><br ><br >

### 示例代码

<<< @/int/demo.vue