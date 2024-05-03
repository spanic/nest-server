import { DeviceData, Status } from './device-data.model';

interface StatusesData {
  [id: DeviceData['id']]: Status;
}

export { StatusesData };
