# MaxBitSolution Test

Тестовое приложение для отображения списка коктейлей

## 🛠 Технологический стек

- **Frontend Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Testing**: Vitest + Vue Test Utils
- **Styling**: SCSS
- **Linting**: ESLint
- **Architecture**: Feature-Sliced Design (FSD)

## 🏗 Архитектура FSD

Проект организован по методологии Feature-Sliced Design:

```
src/
├── app/          # Инициализация приложения, глобальные стили, роутинг
├── entities/     # Бизнес-сущности (cocktail)
├── features/     # Функциональные модули
├── pages/        # Страницы приложения
├── shared/       # Переиспользуемые компоненты и утилиты
└── widgets/      # Композитные блоки интерфейса
```

## 📋 Требования

- **Node.js**: 20+ версия
- **npm** или **yarn**

## 🚀 Команды для запуска

### Разработка
```bash
npm run dev          # Запуск dev-сервера
npm run build        # Сборка для продакшена
npm run preview      # Предварительный просмотр сборки
```

### Тестирование
```bash
npm run test         # Запуск тестов в watch режиме
npm run test:run     # Запуск тестов один раз
npm run test:ui      # Запуск тестов с UI интерфейсом
```

### Качество кода
```bash
npm run lint         # Исправление ошибок линтера
npm run lint:check   # Проверка без исправления
npm run type-check   # Проверка типов TypeScript
```

## 📦 Установка

```bash
npm install
```
