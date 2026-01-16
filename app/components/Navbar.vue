<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router"; // still needed, but auto-imported in Nuxt
import icon from "~/assets/khu.png"; // use ~ alias (project root)
import { useCartStore } from "@/stores/cartStore"; // Pinia store

const cartStore = useCartStore();

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const route = useRoute();
const isHome = computed(() => route.path === "/");
const isAbout = computed(() => route.path === "/about");

// Cart count (reactive)
const cartCount = computed(() => cartStore.items.length ?? 0);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
  }
);
</script>

<template>
  <nav
    class="navbar"
    :class="{ scrolled: isScrolled || (!isHome && !isAbout) }"
  >
    <div class="container navbar-content">
      <!-- Left Section -->
      <div class="nav-left">
        <NuxtLink to="/" class="nav-link">Store</NuxtLink>
        <NuxtLink to="/products" class="nav-link">Product</NuxtLink>
      </div>

      <!-- Center Section - Logo -->
      <div class="nav-center">
        <NuxtLink to="/" class="logo">
          Ever
          <img :src="icon" class="icon" alt="Ever logo" />
        </NuxtLink>
      </div>

      <!-- Right Section -->
      <div class="nav-right">
        <NuxtLink to="/about" class="nav-link">About Us</NuxtLink>
        <NuxtLink to="/cart" class="nav-link cart-link">
          Cart
          <span v-if="cartCount > 0" class="cart-badge-count">{{
            cartCount
          }}</span>
          <span v-else class="cart-badge-dot"></span>
        </NuxtLink>

        <button
          class="mobile-menu-btn"
          @click="toggleMenu"
          aria-label="Toggle menu"
        >
          <i class="ri-menu-4-line"></i>
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile Sidebar -->
  <div class="mobile-sidebar" :class="{ active: isMenuOpen }">
    <div class="sidebar-header">
      <button class="close-btn" @click="toggleMenu" aria-label="Close menu">
        <i class="ri-close-line"></i>
      </button>
    </div>

    <div class="sidebar-links">
      <NuxtLink to="/" class="sidebar-link" @click="toggleMenu">Store</NuxtLink>
      <NuxtLink to="/products" class="sidebar-link" @click="toggleMenu"
        >Product</NuxtLink
      >
      <NuxtLink to="/about" class="sidebar-link" @click="toggleMenu"
        >About Us</NuxtLink
      >
      <NuxtLink to="/cart" class="sidebar-link" @click="toggleMenu">
        Cart
        <span v-if="cartCount > 0">({{ cartCount }})</span>
      </NuxtLink>
    </div>
  </div>

  <!-- Backdrop (closes menu when clicking outside) -->
  <div
    class="sidebar-backdrop"
    :class="{ active: isMenuOpen }"
    @click="toggleMenu"
  ></div>
</template>

<style scoped>
/* Your original styles are almost perfect — just a few small improvements */

.icon {
  height: 38px;
  width: auto;
  margin-left: 8px;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height, 80px);
  background: transparent;
  z-index: 1000;
  transition: all 0.3s ease;
  color: white;
}

.navbar.scrolled {
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.navbar-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.nav-left,
.nav-right {
  display: flex;
  gap: 2.2rem;
  align-items: center;
}

.nav-center {
  justify-self: center;
}

.logo {
  font-size: 2.1rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  letter-spacing: -0.5px;
}

.nav-link {
  font-weight: 500;
  color: white;
  text-transform: uppercase;
  font-size: 0.92rem;
  letter-spacing: 0.6px;
  text-decoration: none;
  opacity: 0.92;
  transition: opacity 0.25s ease, transform 0.2s;
  position: relative;
}

.nav-link:hover {
  opacity: 1;
  transform: translateY(-1px);
}

/* Cart badge */
.cart-link {
  position: relative;
}

.cart-badge-count {
  position: absolute;
  top: -10px;
  right: -14px;
  min-width: 20px;
  height: 20px;
  background: #ef4444;
  border-radius: 999px;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);
}

.cart-badge-dot {
  position: absolute;
  top: -4px;
  right: -8px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(239, 68, 68, 0.5);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-left,
  .nav-right .nav-link:not(.cart-link) {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .nav-right {
    gap: 1rem;
  }
}

/* Sidebar */
.mobile-sidebar {
  position: fixed;
  top: 0;
  right: -320px;
  width: 320px;
  height: 100vh;
  background: #111;
  z-index: 2000;
  transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 2.5rem 2rem;
  color: white;
}

.mobile-sidebar.active {
  right: 0;
}

.sidebar-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 2.2rem;
  cursor: pointer;
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.sidebar-link {
  color: white;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s;
}

.sidebar-link:hover {
  color: #6366f1; /* or your accent color */
}

/* Backdrop */
.sidebar-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1500;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.35s ease;
  backdrop-filter: blur(4px);
}

.sidebar-backdrop.active {
  opacity: 1;
  visibility: visible;
}
</style>
