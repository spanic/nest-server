interface DeviceData {
  id: string;
  name?: string;
  manufacturer?: string;
  model?: string;
  firmwareVersion?: string;
  uptime?: number;
  macAddress?: string;
  ipAddress?: string;
  location?: string;
  status?: Status;
}

enum Status {
  Operational = 'Operational',
  Warning = 'Warning',
  Error = 'Error',
  Offline = 'Offline',
  Unknown = 'Unknown',
}

const deviceDataRxDbJsonSchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
      format: 'uuid',
    },
    name: {
      type: 'string',
    },
    manufacturer: {
      type: 'string',
    },
    model: {
      type: 'string',
    },
    uptime: {
      type: 'integer',
      minimum: 0,
    },
    firmwareVersion: {
      type: 'string',
    },
    macAddress: {
      type: 'string',
    },
    ipAddress: {
      type: 'string',
      format: 'ipv4',
    },
    location: {
      type: 'string',
    },
    status: {
      type: 'string',
      enum: [
        Status.Offline,
        Status.Operational,
        Status.Warning,
        Status.Error,
        Status.Unknown,
      ],
    },
  },
  required: ['id', 'name'],
};

export { DeviceData, Status, deviceDataRxDbJsonSchema };
