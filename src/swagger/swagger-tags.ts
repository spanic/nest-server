export enum SWAGGER_TAGS {
  Devices = 'Devices & statuses',
  Shopping = 'eCommerce & Shopping',
  Auth = 'Authentication',
}

export const SWAGGER_TAGS_DEF: {
  [key in keyof typeof SWAGGER_TAGS]?: { name: string; description?: string };
} = {
  Devices: {
    name: SWAGGER_TAGS.Devices,
    description: 'Requires authorization ⚠️',
  },
  Shopping: {
    name: SWAGGER_TAGS.Shopping,
  },
  Auth: {
    name: SWAGGER_TAGS.Auth,
  },
};
