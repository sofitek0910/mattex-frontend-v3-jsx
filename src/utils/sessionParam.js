
export default {
    getCourseId() {
      return window.sessionStorage.getItem('COURSE_ID');
    },
    setCourseId(courseId) {
      window.sessionStorage.setItem('COURSE_ID', courseId);
    },
    getQuizId() {
      return window.sessionStorage.getItem('QUIZ_ID');
    },
    setQuizId(quizId) {
      window.sessionStorage.setItem('QUIZ_ID', quizId);
    },
}