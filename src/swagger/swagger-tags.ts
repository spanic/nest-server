export enum SWAGGER_TAGS {
  Devices = 'Devices & statuses',
  Auth = 'Authentication',
}

export const SWAGGER_TAGS_DEF: {
  [key in keyof typeof SWAGGER_TAGS]?: { name: string; description?: string };
} = {
  Devices: {
    name: SWAGGER_TAGS.Devices,
    description: 'Requires authorization ⚠️',
  },
  Auth: {
    name: SWAGGER_TAGS.Auth,
  },
};
