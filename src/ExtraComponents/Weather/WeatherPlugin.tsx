import { EnvironmentFilled } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getWeatherSaga } from "../../Redux/Weather/WeatherSagas";
import { useTypeSelector } from "../../Redux/TypeHook";
import s from "./WeatherPlugin.module.css";

const WeatherPlugin: React.FC = () => {
  const dispatch = useDispatch();
  const weather = useTypeSelector((s) => s.weather.data);
  const date = new Date();
  useEffect(() => {
    dispatch(getWeatherSaga(3600000));
  }, [dispatch]);

  let tempetature = "";
  if (!weather.temp) {
  } else if (weather.temp > 0) {
    tempetature = "+" + Math.round(weather.temp);
  } else {
    tempetature = `${Math.round(weather.temp)}`;
  }
  return (
    <div className={s.background} onClick={() => dispatch(getWeatherSaga())} refresh-Tooltip="click to refresh">
      <div className={s.header}>
        <div>
          <EnvironmentFilled /> {weather.sity}
        </div>
        <div>{date.toLocaleString("en-US", { day: "numeric", month: "long" })}</div>
      </div>
      <div className={s.plugin}>
        <div className={s.boxTemp}>
          <div className={s.temp}>{tempetature}&#8451;</div>
          {weather.icon ? <img src={require(`./weatherPicture/${weather.icon}.png`)} alt="weather logo" /> : "logo"}
        </div>

        {!window.matchMedia("(max-width: 600px)").matches && (
          <div className={s.extraData}>
            <div>{weather.weatherDescription}</div>
            <div>
              feels like: {weather.feels_like ? Math.round(weather.feels_like) : weather.feels_like}
              &#8451;
            </div>
            <div>winter: {weather.windSpeed}m/s</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default WeatherPlugin;
