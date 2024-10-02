export class MentalStateExam {
    constructor(exam = {}) {
        this.id = exam.id || 0;
        this.patientId = exam.patientId || 0;
        this.examinerId = exam.examinerId || 0;
        this.examDate = exam.examDate || '';
        this.orientationScore = exam.orientationScore || 0;
        this.registrationScore = exam.registrationScore || 0;
        this.attentionAndCalculationScore = exam.attentionAndCalculationScore || 0;
        this.recallScore = exam.recallScore || 0;
        this.languageScore = exam.languageScore || 0;

        // Propiedades adicionales que se añaden en el servicio
        this.patientName = exam.patientName || '';
        this.patientPhotoUrl = exam.patientPhotoUrl || '';
        this.patientBirthDate = exam.patientBirthDate || '';
        this.examinerName = exam.examinerName || '';
        this.examinerNPI = exam.examinerNPI || '';
        this.totalScore = exam.totalScore || 0;
    }
}
