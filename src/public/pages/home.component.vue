<script>
import { onMounted, computed } from 'vue';
import { useMentalStateExamsService } from '@/nursing/services/exam.service.js';

export default {
  name: 'Home',
  setup() {
    const { mentalStateExams, getMentalStateExams } = useMentalStateExamsService();

    // Llamar al servicio cuando se monta el componente
    onMounted(() => {
      getMentalStateExams();
    });

    // Computed properties para calcular los indicadores
    const examCount = computed(() => mentalStateExams.value.length);

    const highestScore = computed(() => {
      return Math.max(...mentalStateExams.value.map(exam => exam.totalScore), 0);
    });

    const lowestScore = computed(() => {
      return Math.min(...mentalStateExams.value.map(exam => exam.totalScore), 0);
    });

    const averageScore = computed(() => {
      const totalSum = mentalStateExams.value.reduce((sum, exam) => sum + exam.totalScore, 0);
      return examCount.value > 0 ? (totalSum / examCount.value).toFixed(2) : 0;
    });

    return {
      mentalStateExams,
      examCount,
      highestScore,
      lowestScore,
      averageScore
    };
  }
}
</script>

<template>
  <div class="w-full align-content-center">
    <h1>Welcome to HIGN</h1>
    <h2>Mental State Exam Analytics</h2>
    <h3>Score Analytics</h3>

    <!-- Card para mostrar los indicadores -->
    <div class="card p-4">
      <div class="grid">
        <div class="col">
          <strong>{{ $t('exam.count') }}:</strong> {{ examCount }}
        </div>
        <div class="col">
          <strong>{{ $t('highest-score') }}:</strong> {{ highestScore }}
        </div>
        <div class="col">
          <strong>{{ $t('lowest-score') }}:</strong> {{ lowestScore }}
        </div>
        <div class="col">
          <strong>{{ $t('average-score') }}:</strong> {{ averageScore }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.col {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  color: black;
}
</style>
