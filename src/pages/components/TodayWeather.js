import Image from "next/image";
import cloud from "../../assets/cloud.png";
import sun from "../../assets/sun.png";
import { useState } from "react";

export default function TodayWeather(props) {
  const [data, setData] = useState(props.data);
  return (
    <div>
      {(data && data.cod === 200) ? (
        <div>
          <div className="flex flex-col gap-y-2">
            <div>Today&apos;s Weather</div>
            <div className="text-7xl md:text-9xl dark:text-black text-violet-700">
              {Math.round(data.main.temp - 273.15)}°
            </div>
            <div>H: {Math.round(data.main.temp_max - 273.15)}° L:{Math.round(data.main.temp_min - 273.15)}°</div>
          </div>
          <div>
            <Image
              className="w-[140px] h-[140px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px] md:w-[300px] md:h-[300px] absolute top-0 right-0 mt-[-18%] lg:mt-[-18%]"
              src={Math.floor(Math.random() * 2) === 1 ? cloud : sun}
              alt=""
            />
          </div>
          <div className="flex gap-x-4 justify-between flex-wrap">
            <div className="font-bold">{data.name}, {data.sys.country}</div>
            <div className="flex flex-col-reverse sm:flex-row justify-between gap-x-8 items-end">
              <div>{data.date_time}</div>
              <div>Humidity: {data.main.humidity}%</div>
              <div>{data.weather[0].main}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>Please input valid city or country</div>
      )}
    </div>
  );
}
