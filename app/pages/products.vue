<script setup lang="ts">
import ProductCard from "../components/ProductCard.vue";
import type { ProductDataType, ReqProduct } from "@/types/product";
import type { CartItem } from "@/types/cart";
import { onMounted, ref } from "vue";
import { useProductsStore } from "@/stores/productsStore";
import { useCartStore } from "@/stores/cartStore";
//  store ko instance for the product and cart

const store = useProductsStore();
const cartStore = useCartStore();

// const handleAddToCart = (product: ReqProduct) => {
//   cartStore.addToCart(product);
// };

const handleAddToCart = (product: ProductDataType) => {
  // Convert to CartItem by adding quantity
  const cartItem: CartItem = { ...product, quantity: 1 };
  cartStore.addToCart(cartItem);
};
//
const res = ref<ProductDataType[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    await store.loadProducts();
    res.value = store.products;

    // condition if only tere is value of res.value[0] then url of img will console
    console.log(res.value[0]?.image);

    console.log("after res");
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="page-container container main-padding">
    <h1 class="section-title">Our Products</h1>
    <p class="section-subtitle">Explore our full catalog.</p>

    <div class="product-grid">
      <ProductCard
        v-for="product in res"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<style scoped>
.main-padding {
  padding-top: calc(var(--header-height) + 2rem);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding-bottom: 4rem;
}
</style>
