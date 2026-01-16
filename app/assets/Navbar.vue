<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useRoute, useNuxtApp } from "#imports"; // or just useRoute if auto-import works

const { $pinia } = useNuxtApp(); // ← key line for SSR safety

const route = useRoute();
const isHome = computed(() => route.path === "/");
const isAbout = computed(() => route.path === "/about");

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
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

// Safe Pinia access via explicit instance
const cartCount = computed(() => useCartStore($pinia).items.length ?? 0);

// Client-only log
onMounted(() => {
  console.log("Cart items count:", useCartStore($pinia).items.length);
});
</script>

<template>
  <nav
    class="navbar"
    :class="{ scrolled: isScrolled || (!isHome && !isAbout) }"
  >
    <div class="container navbar-content">
      <div class="nav-left">
        <NuxtLink to="/" class="nav-link">Store</NuxtLink>
        <NuxtLink to="/products" class="nav-link">Product</NuxtLink>
      </div>

      <div class="nav-center">
        <NuxtLink to="/" class="logo">
          Ever
          <img src="~/assets/khu.png" class="icon" alt="Ever logo" />
        </NuxtLink>
      </div>

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
          <Icon name="ri:menu-4-line" size="24" />
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile Sidebar -->
  <div class="mobile-sidebar" :class="{ active: isMenuOpen }">
    <div class="sidebar-header">
      <button class="close-btn" @click="toggleMenu" aria-label="Close menu">
        <Icon name="ri:close-line" size="32" />
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
        Cart <span v-if="cartCount > 0">({{ cartCount }})</span>
      </NuxtLink>
    </div>
  </div>

  <div
    class="sidebar-backdrop"
    :class="{ active: isMenuOpen }"
    @click="toggleMenu"
  ></div>
</template>

<!-- Your <style scoped> remains the same -->

<style scoped>
.icon {
  height: 38px;
  width: auto;
}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  background: transparent;
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  color: white;
}

.navbar.scrolled {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
}

.navbar-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
}

.nav-left {
  display: flex;
  gap: 2rem;
  justify-content: flex-start;
}

.nav-center {
  display: flex;
  justify-content: center;
}

.nav-right {
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
  align-items: center;
}

.logo {
  font-size: 2rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-link {
  font-weight: 500;
  color: white;
  text-transform: uppercase;
  font-size: 0.9rem;
  opacity: 0.9;
  letter-spacing: 0.5px;
  position: relative;
  transition: opacity 0.3s;
}

.nav-link:hover {
  opacity: 1;
}

.cart-link {
  position: relative;
}
.cart-badge-count {
  position: absolute;
  top: -8px;
  right: -12px;
  min-width: 18px;
  height: 18px;
  background-color: var(--error-color, red);
  border-radius: 99px;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
.cart-badge-dot {
  position: absolute;
  top: -2px;
  right: -6px;
  width: 6px;
  height: 6px;
  background-color: var(--error-color, red);
  border-radius: 50%;
}

.mobile-menu-btn {
  display: none;
  font-size: 1.5rem;
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .navbar-content {
    display: flex;
    justify-content: space-between;
  }

  .nav-left,
  .nav-right > .nav-link {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }
}

/* Sidebar Styles */
.mobile-sidebar {
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100vh;
  background-color: #1a1a1a;
  z-index: 2000;
  transition: right 0.3s ease-in-out;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);
}

.mobile-sidebar.active {
  right: 0;
}

.sidebar-header {
  display: flex;
  justify-content: flex-end;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-link {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar-link:hover {
  color: var(--primary-color, #4caf50);
}

.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1500;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
}

.sidebar-backdrop.active {
  opacity: 1;
  visibility: visible;
}
</style>
