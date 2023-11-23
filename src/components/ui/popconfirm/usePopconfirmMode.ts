export const usePopconfirmMode = (mode: 'dark' | 'light') => {
  const dark = {
    colorText: '#fff',
    colorPrimary: '#0766AD',
    colorBgElevated: '#141E33',
  };
  const light = {
    colorText: '#6D5580',
    colorPrimary: '#0766AD',
    colorBgElevated: '#F1F5F9',
  };
  if (mode === 'dark') return dark;
  return light;
};
