export const formatRange = (values: string[]) => {
  const [min, max] = values;

  if (min && max) {
    return `${min}-${max} m²`;
  } else if (min && !max) {
    return `> ${min} m²`;
  } else if (!min && max) {
    return `< ${max} m²`;
  }

  return '';
};
