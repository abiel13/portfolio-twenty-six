import apiClient from "./httpClient.js";

export const fetchSkills = async ({ search, signal } = {}) => {
    const params = search ? { search } : undefined;

    const { data } = await apiClient.get("/api/skills", {
        params,
        signal,
    });

    return data;
};

export const fetchSkillById = async (id, { signal } = {}) => {
    if (!id) {
        throw new Error("Skill id is required");
    }

    const { data } = await apiClient.get(`/api/skills/${id}`, { signal });

    return data;
};

