export const pathsApi: TPaths = {
  home: {
    findAll: {
      transfer: "get",
      path: "api/smart/homes",
    },
    findOne: {
      transfer: "get",
      path: "api/smart/home/",
    },
    create: {
      transfer: "post",
      path: "api/smart/home/create",
    },
    update: {
      transfer: "put",
      path: "api/smart/home/update",
    },
    delete: {
      transfer: "delete",
      path: "api/smart/home/",
    },
    findOneForName: {
      transfer: "get",
      path: "api/smart/homename/",
    },
  },
  room: {
    findAll: {
      transfer: "get",
      path: "api/smart/rooms",
    },
    findOne: {
      transfer: "get",
      path: "api/smart/room/",
    },
    create: {
      transfer: "post",
      path: "api/smart/room/create",
    },
    update: {
      transfer: "put",
      path: "api/smart/room/update",
    },
    delete: {
      transfer: "delete",
      path: "api/smart/room/",
    },
    findAllForHome: {
      transfer: "get",
      path: "api/smart/roomshome/",
    },
  },
  device: {
    findAll: {
      transfer: "get",
      path: "api/smart/devices",
    },
    findOne: {
      transfer: "get",
      path: "api/smart/device/",
    },
    create: {
      transfer: "post",
      path: "api/smart/device/create",
    },
    update: {
      transfer: "put",
      path: "api/smart/device/update",
    },
    delete: {
      transfer: "delete",
      path: "api/smart/device/",
    },
  },
  temperature: {
    findAll: {
      transfer: "get",
      path: "api/smart/temperatures",
    },
    update: {
      transfer: "put",
      path: "api/smart/temperature/update",
    },
    setDegrees: {
      transfer: "ws",
      path: "setDegrees",
    },
  },
  user: {
    findAll: {
      transfer: "get",
      path: "api/smart/users",
    },
    findOne: {
      transfer: "get",
      path: "api/smart/user/",
    },
    create: {
      transfer: "post",
      path: "api/smart/user/create",
    },
    update: {
      transfer: "put",
      path: "api/smart/user/update",
    },
    delete: {
      transfer: "delete",
      path: "api/smart/user/",
    },
  },
  auth: {
    check: {
      transfer: "get",
      path: "api/smart/auth/check",
    },
    login: {
      transfer: "post",
      path: "api/smart/auth/login",
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
  findOneForName: TApiMethod;
};

type TRoomPaths = {
  findAll: TApiMethod;
  findOne: TApiMethod;
  create: TApiMethod;
  update: TApiMethod;
  delete: TApiMethod;
  findAllForHome: TApiMethod;
};

type TTemperaturePaths = {
  findAll: TApiMethod;
  update: TApiMethod;
  setDegrees: TApiMethod;
};

type TUserPaths = {
  findAll: TApiMethod;
  findOne: TApiMethod;
  create: TApiMethod;
  update: TApiMethod;
  delete: TApiMethod;
};

type TAuthPaths = {
  check: TApiMethod;
  login: TApiMethod;
};

type TPaths = {
  device: TDevicePaths;
  home: THomePaths;
  room: TRoomPaths;
  temperature: TTemperaturePaths;
  user: TUserPaths;
  auth: TAuthPaths;
};
