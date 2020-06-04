export type FormateParams = {
  id?: string | number;
  description?: string | object;
  defaultMessage?: string;
};

export type format = (
  params: FormateParams,
  values?: Record<string, string | number | boolean | null | undefined | Date>,
) => string;
