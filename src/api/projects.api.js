import apiClient from "./httpClient.js";

export const fetchProjects = async ({ search, signal } = {}) => {
    const params = search ? { search } : undefined;

    const { data } = await apiClient.get("/api/projects", {
        params,
        signal,
    });

    return data;
};

export const fetchProjectById = async (id, { signal } = {}) => {
    if (!id) {
        throw new Error("Project id is required");
    }

    const { data } = await apiClient.get(`/api/projects/${id}`, { signal });

    return data;
};

