import localFont from "next/font/local";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import TodayWeather from "./components/TodayWeather";
import SearchHistory from "./components/SearchHistory";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [searchKey, setSearchKey] = useState("");
  const [weatherDetail, setWeatherDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const fetchWeatherData = async (key) => {
    if (key === "") {
      return;
    }
    setIsLoading(true);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${key}&appid=0b6f588be73dc474fe1307de6f7e13c2`;
      const response = await fetch(url);
      const data = await response.json();
      const updatedData = {
        ...data,
        date_time: new Date().toLocaleString(),
      };
      setWeatherDetail(updatedData);
      if (updatedData.cod === 200) {
        setSearchKey("");
        setSearchHistory((prev) => [
          ...prev,
          {
            name: updatedData.name,
            country: updatedData.sys.country,
            data_time: updatedData.date_time,
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(searchKey);
  }, [searchKey]);

  const updateSearchKey = (key) => {
    setSearchKey(key);
  };

  const removeSearchHistory = (searchHistory) => {
    setSearchHistory(searchHistory);
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className=" w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%]  flex flex-col gap-y-36 row-start-2 items-start sm:items-start">
        <Header updateSearchKey={updateSearchKey} input={searchKey} />
        <div className="w-[100%] flex dark:bg-violet-800 opacity-80 bg-violet-300 h-[70vh] rounded-xl md:p-10 p-4 relative flex-col gap-y-10">
          {isLoading ? (
            <p>Loading weather data...</p>
          ) : (
            <TodayWeather data={weatherDetail} />
          )}
          <SearchHistory
            data={searchHistory}
            updateSearchHistoryKey={updateSearchKey}
            removeSearchHistory={removeSearchHistory}
          />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Make by HKP
      </footer>
    </div>
  );
}
