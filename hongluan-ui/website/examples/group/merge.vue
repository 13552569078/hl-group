<template>
  <hl-row>
    <hl-col span="col">
      <p class="p-b-md">横向融合</p>
      <hl-group dir="horizontal" merge>
        <hl-button type="primary">Group Item</hl-button>
        <hl-button type="primary">Group Item</hl-button>
      </hl-group>
      <hl-group dir="horizontal" merge block class="m-t-lg">
        <hl-button type="primary" outline>Group Item</hl-button>
        <hl-button type="primary" outline>Group Item</hl-button>
      </hl-group>
    </hl-col>
    <hl-col span="col">
      <p class="p-b-md">纵向融合</p>
      <hl-group dir="vertical" merge>
        <hl-button type="primary">Group Item</hl-button>
        <hl-button type="primary">Group Item</hl-button>
      </hl-group>
      <hl-group dir="vertical" merge class="m-l-lg">
        <hl-button type="primary" outline>Group Item</hl-button>
        <hl-button type="primary" outline>Group Item</hl-button>
      </hl-group>
    </hl-col>
  </hl-row>

  <hl-row class="m-t-xxl">
    <hl-col span="col">
      <p class="p-b-md">基本融合</p>
      <hl-group dir="horizontal" merge indent class="m-r-md">
        <hl-input placeholder="请输入内容" />
        <div>
          <div>
            <div>
              <div>
                <hl-dropdown>
                  <hl-button type="primary">
                    <hl-icon>
                      <two-more />
                    </hl-icon>
                  </hl-button>
                  <template #dropdown>
                    <hl-dropdown-menu>
                      <hl-dropdown-item>数据流</hl-dropdown-item>
                      <hl-dropdown-item>传输属性值</hl-dropdown-item>
                      <hl-dropdown-item>已断线</hl-dropdown-item>
                      <hl-dropdown-item disabled>待恢复</hl-dropdown-item>
                      <hl-dropdown-item divider />
                      <hl-dropdown-item>其他</hl-dropdown-item>
                    </hl-dropdown-menu>
                  </template>
                </hl-dropdown>
              </div>
            </div>
          </div>
        </div>
      </hl-group>
    </hl-col>
    <hl-col span="col">
      <p class="p-b-md">深度融合</p>
      <hl-group dir="horizontal" deep-merge indent class="m-r-md">
        <hl-input placeholder="请输入内容" />
        <div>
          <div>
            <div>
              <div>
                <hl-dropdown class="merge-item">
                  <hl-button type="primary">
                    <hl-icon>
                      <two-more />
                    </hl-icon>
                  </hl-button>
                  <template #dropdown>
                    <hl-dropdown-menu>
                      <hl-dropdown-item>数据流</hl-dropdown-item>
                      <hl-dropdown-item>传输属性值</hl-dropdown-item>
                      <hl-dropdown-item>已断线</hl-dropdown-item>
                      <hl-dropdown-item disabled>待恢复</hl-dropdown-item>
                      <hl-dropdown-item divider />
                      <hl-dropdown-item>其他</hl-dropdown-item>
                    </hl-dropdown-menu>
                  </template>
                </hl-dropdown>
              </div>
            </div>
          </div>
        </div>
      </hl-group>
    </hl-col>
  </hl-row>
</template>
<script lang="ts" setup>
import { TwoMore } from '@hongluan-ui/icons'
</script>
