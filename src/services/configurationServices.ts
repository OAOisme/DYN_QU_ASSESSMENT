import { Configuration } from "../models/configuration";

const getConfiguration = async () => {
  return await Configuration.findOne();
};

const updateConfigurationCycle = async ({
  cycle,
  cycleHr,
}: {
  cycle: any;
  cycleHr: any;
}) => {
  return await Configuration.findOneAndUpdate({}, { cycle, cycleHr });
};

const updateConfiguration = async (assigned: any) => {
  return await Configuration.findOneAndUpdate({}, { assigned });
};

const updateConfigurationLastCount = async (lastCount: Date) => {
  return await Configuration.findOneAndUpdate({}, { lastCount });
};

const updateAdminService = async ({
  admin,
  password,
}: {
  admin: string;
  password: string;
}) => {
  return await Configuration.findOneAndUpdate({}, { admin, password });
};

export {
  getConfiguration,
  updateConfigurationLastCount,
  updateConfigurationCycle,
  updateConfiguration,
  updateAdminService,
};
