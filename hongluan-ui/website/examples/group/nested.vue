<template>
  <hl-row gap="var(--lg)">
    <hl-col span="md:col-12">
      <p class="m-b-md">横向嵌套</p>
      <hl-group
        deep-merge
        indent
        full="full-x"
        class="dom-area"
        data-name="G1"
      >
        <hl-group
          dir="vertical"
          deep-merge
          indent
          full
          class="dom-area"
          data-name="G2"
        >
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
        </hl-group>
        <hl-group
          dir="vertical"
          deep-merge
          indent
          full
          class="dom-area"
          data-name="G2"
        >
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
        </hl-group>
        <hl-group
          dir="vertical"
          deep-merge
          indent
          full
          class="dom-area"
          data-name="G2"
        >
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
        </hl-group>
      </hl-group>
    </hl-col>
    <hl-col span="md:col-12">
      <p class="m-b-md">纵向嵌套</p>
      <hl-group
        dir="vertical"
        deep-merge
        indent
        full
        class="dom-area"
        data-name="G1"
      >
        <hl-group
          deep-merge
          indent
          full
          class="dom-area"
          data-name="G2"
        >
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
        </hl-group>
        <hl-group
          deep-merge
          indent
          full
          class="dom-area"
          data-name="G2"
        >
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
        </hl-group>
        <hl-group
          deep-merge
          indent
          full
          class="dom-area"
          data-name="G2"
        >
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
        </hl-group>
      </hl-group>
    </hl-col>
    <hl-col span="md:col-12" class="m-t-lg">
      <p class="m-b-md">多级混合嵌套</p>
      <hl-group
        deep-merge
        indent
        full
        class="dom-area"
        data-name="G1"
      >
        <hl-group
          dir="vertical"
          deep-merge
          indent
          full
          class="dom-area"
          data-name="G2"
        >
          <hl-group
            deep-merge
            indent
            full
            class="dom-area"
            data-name="G3"
          >
            <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
            <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          </hl-group>
          <hl-group
            deep-merge
            indent
            full
            class="dom-area"
            data-name="G3"
          >
            <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
            <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          </hl-group>
          <hl-group
            deep-merge
            indent
            full
            class="dom-area"
            data-name="G3"
          >
            <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
            <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          </hl-group>
        </hl-group>
        <hl-group
          deep-merge
          indent
          full
          class="dom-area"
          data-name="G2"
        >
          <hl-group
            dir="vertical"
            full
            deep-merge
            indent
            class="dom-area"
            data-name="G3"
          >
            <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
            <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          </hl-group>
          <hl-group
            dir="vertical"
            deep-merge
            indent
            full
            class="dom-area"
            data-name="G3"
          >
            <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
            <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-col>
    <hl-col span="md:col-12" class="m-t-lg">
      <p class="m-b-md">多级混合嵌套</p>
      <hl-group
        dir="vertical"
        deep-merge
        indent
        full
        class="dom-area"
        data-name="G1"
      >
        <hl-group
          deep-merge
          indent
          full
          class="dom-area"
          data-name="G2"
        >
          <hl-group
            dir="vertical"
            deep-merge
            indent
            full
            class="dom-area"
            data-name="G3"
          >
            <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
            <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          </hl-group>
          <hl-group
            dir="vertical"
            deep-merge
            indent
            full
            class="dom-area"
            data-name="G3"
          >
            <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
            <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          </hl-group>
          <hl-group
            dir="vertical"
            deep-merge
            indent
            full
            class="dom-area"
            data-name="G3"
          >
            <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
            <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          </hl-group>
        </hl-group>
        <hl-group
          deep-merge
          indent
          full
          class="dom-area"
          data-name="G2"
        >
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
          <span class="display-flex border border-primary items-center items-middle radius-lg text-primary p-xs">Item</span>
        </hl-group>
      </hl-group>
    </hl-col>
  </hl-row>
</template>
