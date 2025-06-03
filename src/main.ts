import './style.css'

const calculateButton = document.getElementById("button") as HTMLButtonElement;
const errorMessage = document.getElementById("errorMessage") as HTMLDivElement;



calculateButton.addEventListener("click", function () {
  removeErrorMessage();
  const sunriseDiv = document.getElementById("sunrise") as HTMLInputElement;
  const sunsetDiv = document.getElementById("sunset") as HTMLInputElement;


  try {

    if (sunriseDiv.value === "" || sunsetDiv.value === "") {
      throw new Error("One or both of the input are empty");
    } else {
      document.getElementById("midnight")!.innerText = calculateNightsPeriods(sunriseDiv.value, sunsetDiv.value).midnight;
      document.getElementById("FirstThird")!.innerText = calculateNightsPeriods(sunriseDiv.value, sunsetDiv.value).firstThird;
      document.getElementById("LastThird")!.innerText = calculateNightsPeriods(sunriseDiv.value, sunsetDiv.value).lastThird;
    }
  
  } catch (error) {
    errorMessage.classList.remove("hidden");
  }

})



function removeErrorMessage() {
  errorMessage.classList.add("hidden");
  return;
}

function calculateNightsPeriods(sunrise: string, sunset: string) {
  // Convert value into array of numbers
  const arrSunrise = Array.from(sunrise.split(":"), Number);
  const arrSunset = Array.from(sunset.split(":"), Number);

  function convertHoursToMinutes(hours: number, minutes = 0): number {
    return hours * 60 + minutes;
  }

  function minutesToMilliseconds(minutes: number) {
    return minutes * 60000;
  }

  // Converting values in minutes and making the difference
  const sunsetToMidnightMinutes = convertHoursToMinutes(24) - convertHoursToMinutes(arrSunset[0], arrSunset[1]);
  const midnightToSunriseMinutes = convertHoursToMinutes(arrSunrise[0], arrSunrise[1]);

  // Calculating the minutes that need to be added to the sunset hours
  const halfOfTheNightInMin = Math.floor((midnightToSunriseMinutes + sunsetToMidnightMinutes) / 2);
  const lastThirdInMin = (midnightToSunriseMinutes + sunsetToMidnightMinutes) * (2/3);
  const firstThirdInMin = (midnightToSunriseMinutes + sunsetToMidnightMinutes) * (1/3);


  
  // Converting the difference in minute between sunrise and sunset in ms in order to use it more smoothly with Date Object
  const halfOfTheNightPeriodInMs = minutesToMilliseconds(halfOfTheNightInMin);
  const firstThirdPeriodInMs = minutesToMilliseconds(firstThirdInMin);
  const lastThirdPeriodInMs = minutesToMilliseconds(lastThirdInMin);


  // Initializing a date to get the sunset hours
  const RandomDate = new Date(`July 21, 2024 ${sunset}:00`);
  // Making a new date, adding the diff and transforming it into a timestring and slicing the seconds out of it
  const TrueMidnight = new Date((RandomDate.getTime() + halfOfTheNightPeriodInMs)).toTimeString().slice(0, 5);
  
  const firstThird = new Date((RandomDate.getTime() + firstThirdPeriodInMs)).toTimeString().slice(0, 5);
  
  const lastThird = new Date((RandomDate.getTime() + lastThirdPeriodInMs)).toTimeString().slice(0, 5);


  return {
    midnight: TrueMidnight,
    firstThird: firstThird,
    lastThird: lastThird,
  }

}
