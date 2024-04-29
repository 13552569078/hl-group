<template>
  <div class="block">
    <hl-timeline>
      <hl-timeline-item :hide-timestamp="true" timestamp="2021/7/12" active>
        <template #label>2021/7/12</template>
        <hl-panel>
          <h4>更新 Github 模板</h4>
          <p>bitjjj</p>
        </hl-panel>
      </hl-timeline-item>
      <hl-timeline-item :hide-timestamp="true" dir="left" timestamp="2021/7/3">
        <template #label>2021/7/12</template>
        <hl-panel>
          <h6>更新 Timeline样式</h6>
          <p>Song</p>
        </hl-panel>
      </hl-timeline-item>
      <hl-timeline-item :hide-timestamp="true" timestamp="2021/7/2">
        <template #label>2021/7/12</template>
        <template #dot>
          <hl-thumb round type="primary" size="md" class="static">
            <span>姜</span>
          </hl-thumb>
        </template>
        <hl-group align="items-top" full="full-x" gap="var(--xs)">
          <hl-group dir="vertical" full="full-x" gap="var(--md)">
            <hl-group gap="var(--xs)">
              <hl-tag type="success" effect="light" size="sm">机组AOC</hl-tag>
              <span>反馈时间：10:01:00</span>
            </hl-group>
            <div class="p-y-sm p-x-lg bg-element radius-md">
              <span class="text-primary">@导调组</span> 收到，全体已就位。
            </div>
          </hl-group>
        </hl-group>
      </hl-timeline-item>
    </hl-timeline>
  </div>
</template>
