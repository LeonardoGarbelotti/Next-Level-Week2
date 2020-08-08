import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppLoading } from 'expo';

import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import AppStack from './src/routes/AppStack';

export default function App() {

  /* carrega as fontes */
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  /* enquanto as fontes não forem carregadas, o app carrega */
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      /* <> é um fragment, ou seja, um elemento (tipo div) mas sem conteúdo visual
      tem que ser utilizado para evitar um erro */
      <>
        <StatusBar style="light" />
        <AppStack />
      </>
    );
  }
}
