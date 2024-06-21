import axios, { AxiosInstance, AxiosResponse } from "axios";
import { pathsApi } from "../../../common/PathsApi";
import { THomeResponse } from "../../../common/HomeTypes";
import { TDeviceRequest, TDeviceResponse } from "../../../common/DeviceTypes";
import type { TUserRequest, TUserResponse } from "../../../common/UserTypes";
import { TLoginResponse } from "../../../common/AuthTypes";
import { TRoomResponse } from "../../../common/RoomTypes";

const apiClient: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
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

  findOneForName: async (
    name: string,
  ): Promise<AxiosResponse<THomeResponse>> => {
    try {
      return await apiClient[pathsApi.home.findOneForName.transfer](
        pathsApi.home.findOneForName.path + name,
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

  create: async (
    device: TDeviceRequest,
  ): Promise<AxiosResponse<TDeviceResponse>> => {
    try {
      return await apiClient[pathsApi.device.create.transfer](
        pathsApi.device.create.path,
        device,
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

export const authApi = {
  check: async (): Promise<AxiosResponse<TUserResponse>> => {
    try {
      return await apiClient[pathsApi.auth.check.transfer](
        pathsApi.auth.check.path,
      );
    } catch (error) {
      throw error;
    }
  },
  login: async (user: TUserRequest): Promise<AxiosResponse<TLoginResponse>> => {
    console.log(localStorage.getItem("accessToken"));
    try {
      return await apiClient[pathsApi.auth.login.transfer](
        pathsApi.auth.login.path,
        user,
      );
    } catch (error) {
      throw error;
    }
  },
};

export const roomsApi = {
  findAllForHome: async (
    homeName: string,
  ): Promise<AxiosResponse<TRoomResponse[]>> => {
    try {
      return await apiClient[pathsApi.room.findAllForHome.transfer](
        pathsApi.room.findAllForHome.path + homeName,
      );
    } catch (error) {
      throw error;
    }
  },
};
