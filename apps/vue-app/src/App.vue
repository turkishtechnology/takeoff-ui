<script setup>
import { ref, onMounted } from 'vue';
import { TkInput, TkCarousel, TkButton, TkPopover, TkDialog, TkSelect } from '@takeoff-ui/vue';

const value = ref('1');

// Edge case states
const dynamicText = ref('Başlangıç içerik');
const asyncLoaded = ref(false);
const resizeCounter = ref(0);
const scrollItems = Array.from({ length: 30 }, (_, i) => `Öğe ${i + 1}`);

// Simulate dynamic content growth after open
function growContent() {
  resizeCounter.value++;
  dynamicText.value += ' • daha fazla içerik';
}

onMounted(() => {
  setTimeout(() => {
    asyncLoaded.value = true;
  }, 1500);
});

const nestedOpen = ref(false);
</script>

<template>
  <div style="display: flex; gap: 48px">
    <h1>{{ value }}</h1>
    <TkInput v-model="value"> </TkInput>
    <div style="width: 1200px; height: 300px">
      <tk-carousel autoplay="true" show-player-button="true" loop="true" slides-per-view="3" navigation-placement="outside">
        <img src="https://picsum.photos/seed/slide1/1200/600" alt="Slide 1" />
        <img src="https://picsum.photos/seed/slide2/1200/600" alt="Slide 2" />
        <img src="https://picsum.photos/seed/slide3/1200/600" alt="Slide 3" />
        <img src="https://picsum.photos/seed/slide4/1200/600" alt="Slide 4" />
        <img src="https://picsum.photos/seed/slide5/1200/600" alt="Slide 3" />
        <img src="https://picsum.photos/seed/slide6/1200/600" alt="Slide 4" />
        <img src="https://picsum.photos/seed/slide7/1200/600" alt="Slide 3" />
        <img src="https://picsum.photos/seed/slide8/1200/600" alt="Slide 4" />
        <img src="https://picsum.photos/seed/slide9/1200/600" alt="Slide 3" />
        <img src="https://picsum.photos/seed/slide10/1200/600" alt="Slide 4" />
        <img src="https://picsum.photos/seed/slide11/1200/600" alt="Slide 4" />
      </tk-carousel>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin: 0 0 12px;
  font: 600 18px/1.3 system-ui;
}
section {
  border: 1px solid #e3e3e3;
  padding: 16px;
  border-radius: 8px;
  background: #fafafa;
}
</style>
// ...existing code...
