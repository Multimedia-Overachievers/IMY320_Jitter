import http from "./api-url";

export const GetAllModules = () => {
    return http.get("/modules");
};

export const GetAllQuestions = () => {
    return http.get("/questions");
};