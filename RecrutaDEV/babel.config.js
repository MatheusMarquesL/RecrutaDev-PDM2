module.exports = function (api) {
  api.cache(true);
  return {
    // O babel-preset-expo já configura o plugin do Reanimated 4 (react-native-worklets).
    // Não adicione 'react-native-reanimated/plugin' aqui, senão ele roda duplicado.
    presets: ['babel-preset-expo'],
  };
};
