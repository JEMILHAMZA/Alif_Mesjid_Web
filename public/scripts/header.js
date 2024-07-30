// document.addEventListener("DOMContentLoaded", async () => {
//     // Function to fetch prayer times
//     const fetchPrayerTimes = async () => {
//         try {
//             const response = await axios.get("http://api.aladhan.com/v1/timingsByCity", {
//                 params: {
//                     city: "Addis Ababa",
//                     country: "Ethiopia",
//                     method: 2,
//                 }
//             });

//             const timings = response.data.data.timings;
//             document.getElementById("prayer-times").innerText = `
//                 Fajr: ${timings.Fajr}, 
//                 Sunrise: ${timings.Sunrise}, 
//                 Dhuhr: ${timings.Dhuhr}, 
//                 Asr: ${timings.Asr}, 
//                 Maghrib: ${timings.Maghrib}, 
//                 Isha: ${timings.Isha}
//             `;
//         } catch (error) {
//             console.error("Error fetching prayer times: ", error);
//         }
//     };

//     // Function to fetch Arabic date
//     const fetchArabicDate = async () => {
//         try {
//             const today = new Date();
//             const day = String(today.getDate()).padStart(2, '0');
//             const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
//             const year = today.getFullYear();
//             const formattedDate = `${day}-${month}-${year}`; // format: DD-MM-YYYY
//             const response = await axios.get(`https://api.aladhan.com/v1/gToH/${formattedDate}`);
//             const hijriData = response.data.data.hijri;

//             const hijriFormattedDate = `${hijriData.month.en} ${hijriData.day}, ${hijriData.year}`;
//             document.getElementById("arabic-date").innerText = hijriFormattedDate;
//         } catch (error) {
//             console.error("Error fetching Arabic date: ", error);
//         }
//     };

//     // Function to fetch Gregorian date
//     const fetchGregorianDate = () => {
//         const today = new Date();
//         const options = { year: 'numeric', month: 'long', day: 'numeric' };
//         const formattedDate = today.toLocaleDateString("en-US", options);
//         document.getElementById("gregorian-date").innerText = formattedDate;
//     };

//     // Fetch prayer times, Arabic date, and Gregorian date
//     await fetchPrayerTimes();
//     await fetchArabicDate();
//     fetchGregorianDate();
// });

  







document.addEventListener("DOMContentLoaded", function () {
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  
    // Fetch Gregorian and Arabic dates
    axios.get(`https://api.aladhan.com/v1/gToH/${formattedDate}`)
      .then(response => {
        const hijri = response.data.data.hijri;
        const gregorian = response.data.data.gregorian;
        const hijriDate = `${hijri.day} ${hijri.month.en}, ${hijri.year}`;
        const gregorianDate = `${gregorian.day} ${gregorian.month.en} ${gregorian.year}`;
        document.getElementById("arabic-date").innerText = hijriDate;
        document.getElementById("gregorian-date").innerText = gregorianDate;
      })
      .catch(error => {
        console.error("Error fetching Arabic date: ", error);
      });
  
    // Fetch prayer times
    const city = "Addis Ababa"; // Replace with your city
    const country = "Ethiopia"; // Replace with your country
    axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`)
      .then(response => {
        const timings = response.data.data.timings;
        const prayerTimes = `Fajr: ${timings.Fajr}, Sunrise: ${timings.Sunrise}, Dhuhr: ${timings.Dhuhr}, Asr: ${timings.Asr}, Maghrib: ${timings.Maghrib}, Isha: ${timings.Isha}`;
        document.getElementById("prayer-times").innerText = prayerTimes;
      })
      .catch(error => {
        console.error("Error fetching prayer times: ", error);
      });
  });
  