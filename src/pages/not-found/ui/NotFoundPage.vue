<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <div class="error-code">
        404
      </div>
      <h1 class="error-title">
        Страница не найдена
      </h1>
      <p class="error-description">
        К сожалению, запрашиваемая страница не существует или была перемещена.
      </p>
      <div class="actions">
        <RouterLink
          to="/"
          class="btn-primary"
        >
          Вернуться на главную
        </RouterLink>
        <button
          class="btn-secondary"
          @click="goBack"
        >
          Назад
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped lang="scss">
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.not-found-content {
  text-align: center;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.95);
  padding: 60px 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.error-code {
  font-size: 120px;
  font-weight: 900;
  color: #667eea;
  line-height: 1;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.error-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
}

.error-description {
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 40px;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  min-width: 140px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }
}

.btn-secondary {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  
  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
}

@media (max-width: 768px) {
  .not-found-content {
    padding: 40px 20px;
  }
  
  .error-code {
    font-size: 80px;
  }
  
  .error-title {
    font-size: 24px;
  }
  
  .error-description {
    font-size: 16px;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    max-width: 200px;
  }
}
</style> 