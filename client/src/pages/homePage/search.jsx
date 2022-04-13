// import React from "react";
// import ReactDOM from "react-dom";

// const initailItems = [
//     { city: "rome", link: "https://cdn.citywonders.com/media/17764/rome-city.jpg?anchor=center&mode=crop&width=1200&height=600" },
//     { city: "Barcelona", link: "https://www.jetsetter.com/wp-content/uploads/sites/7/2018/04/Zrlvh0hw-1380x690.jpeg" },
//     { city: "london", link: 'https://azgovernor.gov/sites/default/files/londs_0.jpg' },
//     { city: 'paris', link: "https://cdn.hipwallpaper.com/i/82/73/QoZlmC.jpg" },
//     { city: "Dubai", link: 'https://images.hdqwalls.com/download/dubai-burj-khalifa-minimalist-d0-1280x1024.jpg' },
//     { city: "kualalumpur", link: 'https://wallpapercave.com/wp/wp2378918.jpg' },
//     { city: "new york", link: 'https://blog-www.pods.com/wp-content/uploads/2019/04/MG_1_1_New_York_City-1.jpg' },
//     { city: "tokyo", link: 'https://www.trafalgar.com/real-word/wp-content/uploads/sites/3/2019/11/First-time-in-Tokyo-1536x996.jpg' },
//     { city: "delhi", link: 'https://curlytales.com/wp-content/uploads/2020/08/delhi.jpg' },
//     { city: "shanghai", link: 'https://pix10.agoda.net/geo/city/3987/1_3987_02.jpg?s=1920x822' },
//     { city: "sau paulo", link: 'https://cw-gbl-gws-prod.azureedge.net/-/media/cw/americas/brazil/office-pages/sao-paulo-mobile.jpg?rev=686a6a5a604e4a7f9edaa027320f58fe' },
//     { city: "losAngeles", link: "https://i.ytimg.com/vi/tvDH4JM_gME/maxresdefault.jpg" },
//     { city: "mexico", link: 'https://latamlist.com/wp-content/uploads/2020/01/mexico-city-travel.adapt_.1900.1-1-800x500.jpg' },
//     { city: "cairo", link: 'https://www.saltinourhair.com/wp-content/uploads/2019/03/cairo-pyramids-giza.jpg' },
//     { city: "dhaka", link: 'https://cdn.britannica.com/97/189797-050-1FC0041B/Night-view-Dhaka-Bangladesh.jpg' },
//     { city: "mumbai", link: 'https://www.telegraph.co.uk/content/dam/Travel/Destinations/Asia/India/Mumbai/gateway-of-india-mumbai.jpg' },
//     { city: "beijing", link: 'https://www.scintica.com/wp-content/uploads/2019/05/GettyImages-4894349271-59e8e9a8d088c000119103c6.jpg' },
//     { city: "osaka", link: 'https://www.jrailpass.com/blog/wp-content/uploads/2019/11/osaka-jo-castle-1280x720.jpg' },
//     { city: "astana", link: 'https://moderndiplomacy.eu/wp-content/uploads/2018/07/astana-20-years.jpg' },
//     { city: "istanbul", link: 'https://www.advertisingweek360.com/wp-content/uploads/2019/05/169istanbul-1170x600.jpg' },
//     { city: "seoul", link: 'https://esportsuncut.com/wp-content/uploads/2019/03/Korea.jpg' },
//     { city: "berlin", link: 'https://media.globalchampionstour.com/cache/750x429/assets/berlin.jpg' },
//     { city: "rio de janeiro", link: 'https://www.avianca.com/content/dam/avianca_new/destinos/semana/gig/1-porque-visitarla/destino-rio-de-janeiro-brazil-para-conocer-el-cerro-del-corcovado.jpg' },
//     { city: "sydney", link: 'https://media.tacdn.com/media/attractions-content--1x-1/0b/29/2c/d8.jpg' },
//     { city: "ottawa", link: 'https://i.ytimg.com/vi/9qnaJexpdrM/maxresdefault.jpg' },
//     { city: "Washington DC", link: 'https://www.worldtravelguide.net/wp-content/uploads/2017/04/Think-USA-WashingtonDC-CapitolBuilding-488869710-f11photo-copy.jpg' },
//     { city: "Athens", link: 'https://traveler.marriott.com/wp-content/uploads/2019/02/GI_1076721978_MonastirakiPlace.jpg' },
//     { city: "singapore", link: 'https://ssl.tzoo-img.com/images/tzoo.18886.0.651788.Singapore.jpg' },
//     { city: "maldives", link: 'https://qtxasset.com/Hotel%20Management-1508949476/mercuremaldiveskoodooresortmaldivesexterior.jpg?zbxIScOeOJEvMU8kcH1pm8g7UG9zZegb' },
//     { city: "zagreb", link: 'https://pvzg.hr/en/files/2020/01/zagreb.jpg' },
//     { city: "warsaw", link: 'https://www.ebrd.com/image/1395291213789.jpg' },
//     { city: "riga", link: 'https://www.aviontourism.com/images/1920-900-fix/16fbcd77-bd8d-41ba-af83-9dd83b59bcb5' },
//     { city: "tunis", link: 'https://www.worldtravelguide.net/wp-content/uploads/2017/03/shu-Tunisia-SidiBouSaid-760300645-1440x823.jpg' },
// ],

//     const Search = () => {
//         const [searchTerm, setSearchTerm] = React.useState("");
//         const [searchResults, setSearchResults] = React.useState([]);
//         const handleChange = event => {
//             setSearchTerm(event.target.value);
//         };
//         React.useEffect(() => {
//             const results = initailItems.filter(city =>
//                 city.toLowerCase().includes(searchTerm)
//             );
//             setSearchResults(results);
//         }, [searchTerm]);

//         return (
//             <div className="App">
//                 <input
//                     type="text"
//                     placeholder="Search"
//                     value={searchTerm}
//                     onChange={handleChange}
//                 />
//                 <ul>
//                     {searchResults.map(item => (
//                         <li>{item}</li>
//                     ))}
//                 </ul>
//             </div>
//         );
//     }
// export default Search;
