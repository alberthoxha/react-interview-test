import axios, { AxiosResponse } from "axios";
import type { Jobs } from "../_shared/types";

const API_URL = "http://localhost:3000";

export const getJobs = async (): Promise<Jobs[]> => {
  try {
    const response: AxiosResponse<Jobs[]> = await axios.get(`${API_URL}/jobs`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching jobs: ${error}`);
  }
};

export const getJobById = async (id: string): Promise<Jobs> => {
  try {
    const response: AxiosResponse<Jobs> = await axios.get(
      `${API_URL}/jobs/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching this job: ${error}`);
  }
};

export const createJob = async (payload: Partial<Jobs>): Promise<Jobs> => {
  try {
    const response: AxiosResponse<Jobs> = await axios.post(
      `${API_URL}/jobs`,
      payload
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error creating this job: ${error}`);
  }
};

export const updateJob = async (
  id: string,
  payload: Partial<Jobs>
): Promise<Jobs> => {
  try {
    const response: AxiosResponse<Jobs> = await axios.put(
      `${API_URL}/jobs/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error updating this job: ${error}`);
  }
};

export const deleteJob = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/jobs/${id}`);
  } catch (error) {
    throw new Error(`Error deleting this job: ${error}`);
  }
};
