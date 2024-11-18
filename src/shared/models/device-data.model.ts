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

export { DeviceData, Status };
