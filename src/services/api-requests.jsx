import http from "./api-url";

export const GetAllModules = () => {
    return http.get("/modules");
};

export const GetAllQuestions = () => {
    return http.get("/get-all-questions");
};

export const GetQuestions = (moduleCode) => {
    return http.post("/questions", {
        moduleCode: moduleCode
    });
}

export const UpdateChapterQuestion = (moduleIndex, chapterIndex, questionIndex) => {
    return http.post('http://localhost:5000/update-chapter-question', {
        moduleIndex: moduleIndex,
        chapterIndex: chapterIndex,
        questionIndex: questionIndex
    });
}

export const AddQuizScore = (moduleIndex, chapterIndex, score, quizTime) => {
    return http.post('http://localhost:5000/add-quiz-score', {
        moduleIndex: moduleIndex,
        chapterIndex: chapterIndex,
        score: score,
        quizTime: quizTime
    });
}