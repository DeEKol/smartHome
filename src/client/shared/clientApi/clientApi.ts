import axios, { AxiosInstance, AxiosResponse } from "axios";
import { pathsApi } from "../../../common/PathsApi";
import { THomeResponse } from "../../../common/HomeTypes";
import { TDeviceResponse } from "../../../common/DeviceTypes";

const apiClient: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const homeApi = {
  findAll: async (): Promise<AxiosResponse<THomeResponse[]>> => {
    try {
      return await apiClient[pathsApi.home.findAll.transfer](
        pathsApi.home.findAll.path,
      );
    } catch (error) {
      throw error;
    }
  },
  findOne: async (id: number): Promise<AxiosResponse<THomeResponse>> => {
    try {
      return await apiClient[pathsApi.home.findOne.transfer](
        pathsApi.home.findOne.path + id,
      );
    } catch (error) {
      throw error;
    }
  },
};

export const deviceApi = {
  findAll: async (): Promise<AxiosResponse<TDeviceResponse[]>> => {
    try {
      return await apiClient[pathsApi.device.findAll.transfer](
        pathsApi.device.findAll.path,
      );
    } catch (error) {
      throw error;
    }
  },
  findOne: async (id: number): Promise<AxiosResponse<TDeviceResponse>> => {
    try {
      return await apiClient[pathsApi.device.findOne.transfer](
        pathsApi.device.findOne.path + id,
      );
    } catch (error) {
      throw error;
    }
  },

  update: async (
    device: TDeviceResponse,
  ): Promise<AxiosResponse<TDeviceResponse>> => {
    try {
      return await apiClient[pathsApi.device.update.transfer](
        pathsApi.device.update.path,
        device,
      );
    } catch (error) {
      throw error;
    }
  },
};
