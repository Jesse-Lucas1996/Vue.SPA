<script>
import axios from 'axios'

async function getWeather(){
  const response = axios.get("https://localhost:7092/WeatherForecast")
  const res = await response;
  return res.data;
}
</script>
<template>
    <div> {{getWeather}} </div>
</template>
