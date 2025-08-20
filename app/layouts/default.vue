<script setup lang="ts">

</script>

<template>
  <div class="pb-40">
    <div class="sticky top-0 bg-[var(--ui-bg)]/10 z-10 mb-5 backdrop-blur-lg text-center">
      <h1 class="font-black text-lg uppercase py-3.5">
        Sub Merge
      </h1>
      <USeparator type="dashed" />
    </div>

    <UContainer>
      <slot />
    </UContainer>
  </div>
</template>
