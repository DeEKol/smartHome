export const pathsApi: TPaths = {
  home: {
    findAll: {
      transfer: "get",
      path: "/api/smart/homes",
    },
    findOne: {
      transfer: "get",
      path: "/api/smart/home/",
    },
    create: {
      transfer: "post",
      path: "/api/smart/home",
    },
    update: {
      transfer: "put",
      path: "/api/smart/home/update",
    },
    delete: {
      transfer: "delete",
      path: "/api/smart/home/",
    },
  },
  room: {
    findAll: {
      transfer: "get",
      path: "/api/smart/rooms",
    },
    findOne: {
      transfer: "get",
      path: "/api/smart/room/",
    },
    create: {
      transfer: "post",
      path: "/api/smart/room",
    },
    update: {
      transfer: "put",
      path: "/api/smart/room/update",
    },
    delete: {
      transfer: "delete",
      path: "/api/smart/room/",
    },
  },
  device: {
    findAll: {
      transfer: "get",
      path: "/api/smart/devices",
    },
    findOne: {
      transfer: "get",
      path: "/api/smart/device/",
    },
    create: {
      transfer: "post",
      path: "/api/smart/device",
    },
    update: {
      transfer: "put",
      path: "/api/smart/device/update",
    },
    delete: {
      transfer: "delete",
      path: "/api/smart/device/",
    },
  },
  temperature: {
    findAll: {
      transfer: "get",
      path: "/api/smart/temperatures",
    },
    update: {
      transfer: "put",
      path: "/api/smart/temperature/update",
    },
    setDegrees: {
      transfer: "ws",
      path: "setDegrees",
    },
  },
};

type TApiMethod = {
  transfer: "get" | "post" | "put" | "delete" | "ws";
  path: string;
};

type TDevicePaths = {
  findAll: TApiMethod;
  findOne: TApiMethod;
  create: TApiMethod;
  update: TApiMethod;
  delete: TApiMethod;
};

type THomePaths = {
  findAll: TApiMethod;
  findOne: TApiMethod;
  create: TApiMethod;
  update: TApiMethod;
  delete: TApiMethod;
};

type TRoomPaths = {
  findAll: TApiMethod;
  findOne: TApiMethod;
  create: TApiMethod;
  update: TApiMethod;
  delete: TApiMethod;
};

type TTemperaturePaths = {
  findAll: TApiMethod;
  update: TApiMethod;
  setDegrees: TApiMethod;
};

type TPaths = {
  device: TDevicePaths;
  home: THomePaths;
  room: TRoomPaths;
  temperature: TTemperaturePaths;
};
