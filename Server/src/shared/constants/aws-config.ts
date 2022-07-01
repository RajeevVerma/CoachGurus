import { ServiceConfigurationOptions } from "aws-sdk/lib/service";

export let dbEndpoint = "http://localhost:8000";

export const setProductionEndpoint = (): void => {
    serviceConfigOptions.endpoint = "https://dynamodb.ap-south-1.amazonaws.com";
};

export const serviceConfigOptions: ServiceConfigurationOptions = {
  region: "ap-south-1",
  endpoint: dbEndpoint,
};
