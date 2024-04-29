<template>
  <hl-row align="items-center">
    <hl-col span="lg:col-12">
      <p>Number</p>
      <hl-badge :value="1" type="primary" class="m-r-md" />
      <hl-badge :value="2" type="primary" outline class="m-r-md" />
      <hl-badge :value="3" type="primary" round class="m-r-md" />
    </hl-col>
    <hl-col span="lg:col-12">
      <p>String</p>
      <hl-badge value="Badge" type="primary" class="m-r-md" />
      <hl-badge value="Badge Round" type="primary" round class="m-r-md" />
    </hl-col>
  </hl-row>
</template>
