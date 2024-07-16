export const isUuid = (uuid: string): boolean => {
  return uuid.match(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  )
    ? true
    : false;
};
