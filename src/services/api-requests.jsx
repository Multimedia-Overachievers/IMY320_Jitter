import http from "./api-url";

export const Wake = () => {
    return http.get("/wake");
};

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

export const SetActiveModule = (moduleIndex) => {
    return http.post("/set-active-module", {
        moduleIndex: moduleIndex
    });
}

export const GetActiveModule = () => {
    return http.get("/get-active-module");
}

export const UpdateChapterQuestion = (moduleIndex, chapterIndex, questionIndex) => {
    return http.post('/update-chapter-question', {
        moduleIndex: moduleIndex,
        chapterIndex: chapterIndex,
        questionIndex: questionIndex
    });
}

export const AddQuizScore = (moduleIndex, chapterIndex, score, quizTime) => {
    return http.post('/add-quiz-score', {
        moduleIndex: moduleIndex,
        chapterIndex: chapterIndex,
        score: score,
        quizTime: quizTime
    });
}