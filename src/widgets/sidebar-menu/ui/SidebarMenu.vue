<template>
  <div class="sidebar-menu">
    <ul class="sidebar-menu__list">
      <li
        v-for="code in cocktailCodes"
        :key="code"
        class="sidebar-menu__item"
      >
        <RouterLink
          :to="`/${code}`"
          class="sidebar-menu__link"
        >
          {{ code }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  cocktailCodes: readonly string[]
}>()

</script>

<style lang="scss">
.sidebar-menu {
  min-width: 20vw;
  height: calc(100vh - 40px);
  border: 1px solid #e1e5e9;
  border-radius: 10px;
  position: sticky;
  top: 0;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.sidebar-menu__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.sidebar-menu__item {
  border-bottom: 1px solid #f5f5f5;
  flex: 1;
  
  &:last-child {
    border-bottom: none;
  }

  &:first-child .sidebar-menu__link {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
}

.sidebar-menu__link {
  text-decoration: none;
  padding: 12px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  color: #2c3e50;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }
  
  &.router-link-active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    font-weight: 600;
  }
}

@media screen and (max-width: 768px) {
  .sidebar-menu{
    position: static;
    height: auto;
    width: 100%;
  }

  .sidebar-menu__item:last-child .sidebar-menu__link {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
}
</style>