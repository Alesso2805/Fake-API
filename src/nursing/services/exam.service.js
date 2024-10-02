import { ref } from 'vue';
import axios from 'axios';

export function useMentalStateExamsService() {
    const baseUrl = 'http://localhost:3000';
    const mentalStateExams = ref([]);

    const getMentalStateExams = async () => {
        try {
            const [examsResponse, patientsResponse, examinersResponse] = await Promise.all([
                axios.get(`${baseUrl}/mental-state-exams`),
                axios.get(`${baseUrl}/patients`),
                axios.get(`${baseUrl}/examiners`)
            ]);

            const exams = examsResponse.data;
            const patients = patientsResponse.data;
            const examiners = examinersResponse.data;

            mentalStateExams.value = exams.map((exam) => {
                const patient = patients.find(p => p.id === exam.patientId);
                const examiner = examiners.find(e => e.id === exam.examinerId);

                return {
                    ...exam,
                    patientName: `${patient.firstName} ${patient.lastName}`,
                    patientPhotoUrl: patient.photoUrl,
                    patientBirthDate: patient.birthDate,
                    examinerName: `${examiner.firstName} ${examiner.lastName}`,
                    examinerNPI: examiner.nationalProviderIdentifier,
                    totalScore: calculateTotalScore(exam)
                };
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const calculateTotalScore = (exam) => {
        return (
            exam.orientationScore +
            exam.registrationScore +
            exam.attentionAndCalculationScore +
            exam.recallScore +
            exam.languageScore
        );
    };

    return {
        mentalStateExams,
        getMentalStateExams,
        calculateTotalScore
    };
}
