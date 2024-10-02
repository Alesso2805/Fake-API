<template>
  <div class="overview-container">
    <h1>Examiner Performance Overview</h1>
    <div class="card-container">
      <div
          v-for="examiner in examinersWithPerformance"
          :key="examiner.id"
          class="examiner-card"
      >
        <div class="card-header">
          <h2>{{ examiner.fullName }}</h2>
        </div>
        <div class="card-body">
          <h3>NPI: {{ examiner.nationalProviderIdentifier }}</h3>
          <p>Mental State Exam Performance</p>
          <p>{{ $t('current-assigned-mental-state-exam-count') }} : {{examiner.assignedExamCount }} </p>
          <p>
            {{ $t('average-assigned-mental-state-exam-total-score') }}: {{
              examiner.averageTotalScore
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ExaminerPerformanceOverview",
  data() {
    return {
      examiners: [],
      mentalStateExams: [],
    };
  },
  computed: {
    examinersWithPerformance() {
      // Combina los datos del examinador con los resultados calculados
      return this.examiners.map((examiner) => {
        const exams = this.mentalStateExams.filter(
            (exam) => exam.examinerId === examiner.id
        );

        const assignedExamCount = exams.length;

        // Calcula el puntaje total promedio de los exámenes asignados
        const totalScore = exams.reduce((total, exam) => {
          const examTotalScore =
              exam.orientationScore +
              exam.registrationScore +
              exam.attentionAndCalculationScore +
              exam.recallScore +
              exam.languageScore;
          return total + examTotalScore;
        }, 0);

        const averageTotalScore =
            assignedExamCount > 0
                ? (totalScore / assignedExamCount).toFixed(2)
                : 0;

        return {
          ...examiner,
          fullName: `${examiner.firstName} ${examiner.lastName}`,
          assignedExamCount,
          averageTotalScore,
        };
      });
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        // Petición para obtener examinadores
        const examinerResponse = await axios.get("http://localhost:3000/examiners");
        this.examiners = examinerResponse.data;

        // Petición para obtener exámenes de salud mental
        const examResponse = await axios.get("http://localhost:3000/mental-state-exams");
        this.mentalStateExams = examResponse.data;

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

<style scoped>
.overview-container {
  padding: 20px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 20px;
}

.examiner-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
}

.card-header h2 {
  font-size: 1.5rem;
  margin: 0;
}

.card-body h3 {
  margin: 10px 0;
}
</style>
