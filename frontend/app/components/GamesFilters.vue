<template>
  <div class="filters">
    <div class="filters__row">
      <div class="filters__search">
        <svg class="filters__search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
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
        <option value="">Orden: Recientes</option>
        <option value="priority">Prioridad</option>
        <option value="score">Puntuación</option>
        <option value="completed">Completados</option>
        <option value="in_progress">En proceso</option>
      </select>

      <select
        :value="completed"
        class="filters__input filters__select"
        @change="$emit('update:completed', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">Todos</option>
        <option value="false">Pendientes</option>
        <option value="true">Completados</option>
      </select>
    </div>

    <div class="filters__row filters__row--secondary">
      <input
        :value="category"
        type="text"
        class="filters__input"
        placeholder="Categoría..."
        @input="$emit('update:category', ($event.target as HTMLInputElement).value)"
      />
      <input
        :value="tag"
        type="text"
        class="filters__input"
        placeholder="Etiqueta..."
        @input="$emit('update:tag', ($event.target as HTMLInputElement).value)"
      />
      <button class="filters__clear" @click="$emit('reset')">
        Limpiar filtros
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  search: string
  sort: string
  category: string
  tag: string
  completed: string
  loading: boolean
}>()

defineEmits<{
  'update:search': [value: string]
  'update:sort': [value: string]
  'update:category': [value: string]
  'update:tag': [value: string]
  'update:completed': [value: string]
  reset: []
}>()
</script>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.filters__row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filters__search {
  flex: 1;
  min-width: 200px;
  position: relative;
}

.filters__search-icon {
  position: absolute;
  left: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-dim);
  pointer-events: none;
}

.filters__input--search {
  padding-left: 2rem;
}

.filters__input {
  padding: 0.45rem 0.7rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 0.75rem;
  font-weight: 500;
  font-family: var(--font-body);
  outline: none;
  transition: all 0.2s;
}

.filters__input:focus {
  border-color: var(--border-neon-active);
  box-shadow: 0 0 0 3px var(--neon-glow);
}

.filters__input::placeholder {
  color: var(--text-dim);
  opacity: 0.5;
}

.filters__select {
  cursor: pointer;
  min-width: 140px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23545472'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  padding-right: 2rem;
}

.filters__select option {
  background: var(--bg-elevated);
  color: var(--text);
}

.filters__clear {
  padding: 0.45rem 0.9rem;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-dim);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.filters__clear:hover {
  color: var(--neon);
  border-color: var(--border-neon);
}

@media (max-width: 640px) {
  .filters__row {
    flex-direction: column;
  }

  .filters__search {
    min-width: 0;
  }

  .filters__select {
    min-width: 0;
  }
}
</style>
