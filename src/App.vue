<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
// import products from "@/data/products.json";
import { useProductStore } from "./stores/ProductStore";
import { useCartStore } from "./stores/CartStore"
// import { storeToRefs } from "pinia";
// const { products } = storeToRefs(useProductStore());
// import { ref, resactive } from "vue";
const productStore = useProductStore();
const cartStore = useCartStore();
// const history = reactive([])
// const future = reactive([])
// const doingHistory = ref(false)
// history.push(JSON.stringify(cartStore.$state));;

// const undo = () => {
//   if (history.length === 1) return
//   doingHistory.value = true
//   history.pop()
//   cartStore.$state = JSON.parse(history.at(-1))
//   doingHistory.value = false
// }
// const redo = () => {
//   if (future.length === 0) {
//     console.log('No states to redo.');
//     return;
//   }

//   const latestState = future.pop();
//   console.log('Latest State:', latestState);

//   doingHistory.value = true;
//   history.push(latestState);
//   cartStore.$state = JSON.parse(latestState);
//   doingHistory.value = false;
// }


// cartStore.$subscribe((mutation, state) => {
//   if (!doingHistory.value) {
//     history.push(JSON.stringify(state));
//     future.splice(0, future.length)
//     //no podem resetejar a zero ja que perdriem la reactivitat
//   }
// })


productStore.fill()

cartStore.$onAction(({
  name,
  store,
  args,
  after,
  onError
}) => {
  if (name === 'addItems') {
    after(() => {
      console.log(args[0])
    })
    onError((error) => {
      console.log("Hello error:", error.message);
    })
  }
  store.$patch({
    counter: store.counter + 1,
    name: "Samarreta"
  })
})







</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard v-for="product in productStore.products" :key="product.name" :product="product"
        @addToCart="cartStore.addToCart($event, product)" />
    </ul>
  </div>
</template>
