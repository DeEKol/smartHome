import axios, { AxiosInstance, AxiosResponse } from "axios";
import { pathsApi } from "../../../common/PathsApi";
import { THomeRequest, THomeResponse } from "../../../common/HomeTypes";
import { TDeviceRequest, TDeviceResponse } from "../../../common/DeviceTypes";
import type { TUserRequest, TUserResponse } from "../../../common/UserTypes";
import { TLoginResponse } from "../../../common/AuthTypes";
import { TRoomRequest, TRoomResponse } from "../../../common/RoomTypes";

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

  create: async (home: THomeRequest): Promise<AxiosResponse<THomeResponse>> => {
    try {
      return await apiClient[pathsApi.home.create.transfer](
        pathsApi.home.create.path,
        home,
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
  findOneForRoomId: async (
    id: number,
  ): Promise<AxiosResponse<TDeviceResponse[]>> => {
    try {
      return await apiClient[pathsApi.device.findOneForRoomId.transfer](
        pathsApi.device.findOneForRoomId.path + id,
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

  delete: async (id: number): Promise<AxiosResponse<TDeviceResponse>> => {
    try {
      return await apiClient[pathsApi.device.delete.transfer](
        pathsApi.device.delete.path + id,
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
      console.log(error);
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
  create: async (room: TRoomRequest): Promise<AxiosResponse<TRoomResponse>> => {
    try {
      return await apiClient[pathsApi.room.create.transfer](
        pathsApi.room.create.path,
        room,
      );
    } catch (error) {
      throw error;
    }
  },
};

export const userApi = {
  findAll: async (): Promise<AxiosResponse<TUserResponse[]>> => {
    try {
      return await apiClient[pathsApi.user.findAll.transfer](
        pathsApi.user.findAll.path,
      );
    } catch (error) {
      throw error;
    }
  },
  findOne: async (id: number): Promise<AxiosResponse<TUserResponse>> => {
    try {
      return await apiClient[pathsApi.user.findOne.transfer](
        pathsApi.user.findOne.path + id,
      );
    } catch (error) {
      throw error;
    }
  },

  create: async (user: TUserRequest): Promise<AxiosResponse<TUserResponse>> => {
    try {
      return await apiClient[pathsApi.user.create.transfer](
        pathsApi.user.create.path,
        user,
      );
    } catch (error) {
      throw error;
    }
  },

  update: async (
    user: TUserResponse,
  ): Promise<AxiosResponse<TUserResponse>> => {
    try {
      return await apiClient[pathsApi.user.update.transfer](
        pathsApi.user.update.path,
        user,
      );
    } catch (error) {
      throw error;
    }
  },
};
