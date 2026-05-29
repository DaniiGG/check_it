<template>
  <div class="filters">
    <div class="filters__row">
      <div class="filters__search">
        <input
          :value="search"
          type="text"
          class="filters__input filters__input--search"
          placeholder="Buscar por nombre..."
          @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <select
        :value="sort"
        class="filters__input filters__select"
        @change="$emit('update:sort', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">Orden: fecha</option>
        <option value="score">Puntuación</option>
        <option value="priority">Prioridad</option>
        <option value="completed">Completados</option>
        <option value="in_progress">En proceso</option>
      </select>

      <select
        :value="completed"
        class="filters__input filters__select"
        @change="$emit('update:completed', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">Todos</option>
        <option value="true">Completados</option>
        <option value="false">No completados</option>
      </select>
    </div>

    <div class="filters__row">
      <input
        :value="category"
        type="text"
        class="filters__input"
        placeholder="Filtrar por categoría..."
        @input="$emit('update:category', ($event.target as HTMLInputElement).value)"
      />
      <input
        :value="tag"
        type="text"
        class="filters__input"
        placeholder="Filtrar por etiqueta..."
        @input="$emit('update:tag', ($event.target as HTMLInputElement).value)"
      />
      <button class="btn-neon btn-neon--small" @click="$emit('reset')">
        <span>Limpiar</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  search: string;
  sort: string;
  category: string;
  tag: string;
  completed: string;
  loading: boolean;
}>();

defineEmits<{
  'update:search': [value: string];
  'update:sort': [value: string];
  'update:category': [value: string];
  'update:tag': [value: string];
  'update:completed': [value: string];
  reset: [];
}>();
</script>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
}

.filters__row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filters__search {
  flex: 1;
  min-width: 180px;
}

.filters__input {
  width: 100%;
  padding: 0.5rem 0.7rem;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.8rem;
  font-family: var(--font-mono);
  outline: none;
  transition: all 0.2s;
}

.filters__input:focus {
  border-color: var(--neon);
  box-shadow: 0 0 6px var(--neon-glow);
}

.filters__input::placeholder {
  color: #333;
}

.filters__select {
  cursor: pointer;
  min-width: 140px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  padding-right: 2rem;
}

.filters__select option {
  background: var(--bg);
  color: var(--text);
}

@media (max-width: 640px) {
  .filters__row {
    flex-direction: column;
  }

  .filters__select {
    min-width: 0;
  }
}
</style>