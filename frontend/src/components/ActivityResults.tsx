import { Answers } from "@/pages/Home";
import { useEffect, useState } from "react";

interface ActivityResultsProps {
  answers: Answers;
  onReset: () => void;
}

export const ActivityResults = ({ answers, onReset }: ActivityResultsProps) => {
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [layoverDuration, setLayoverDuration] = useState(0);

  const flightNumber = answers.flightNumber;
  const flightNumber2 = answers.flightNumber2;
  const departureDate = answers.departureDate;
  const flightInfoUrl1 = `/data/flights?date=${departureDate}&flightNumber=${flightNumber}`;
  const flightInfoUrl2 = `/data/flights?date=${departureDate}&flightNumber=${flightNumber2}`;

  useEffect(() => {
    fetch(flightInfoUrl1)
      .then((res) => res.json())
      .then((data) => {
        setArrivalTime(data[0].arrivalTime);
      })
      .catch((error) => console.error(error));
  });

  useEffect(() => {
    fetch(flightInfoUrl2)
      .then((res) => res.json())
      .then((data) => {
        setDepartureTime(data[0].departureTime);
        let layoverDuration =
          new Date(data[0].departureTime) - new Date(arrivalTime);
        setLayoverDuration(layoverDuration);
        console.log(layoverDuration);
      })
      .catch((error) => console.error(error));
  });

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4 text-white">
      <h1 className="text-3xl">Results</h1>
      <p>Flight Number: {flightNumber}</p>
      <p>Departure Date: {departureDate}</p>
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-md"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
};
