import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ShowSinglePlayerPickups from './pages/ShowSinglePlayerPickups';
import RegimentRecordsLoad from './pages/RegimentRecordsLoad';
import AdminLoad from './pages/AdminLoad';
import TournamentHistoryLoad from './pages/TournamentHistoryLoad';
import KumiteSeason1 from './pages/KumiteSeason1';
import KumiteSeason2 from './pages/KumiteSeason2';
import KumiteSeason3 from './pages/KumiteSeason3';
import KumiteSeason4 from './pages/KumiteSeason4';
import KumiteSeason5 from './pages/KumiteSeason5';
import KumiteSeason6 from './pages/KumiteSeason6';
import Summer2023NormalTourney from './pages/Summer2023NormalTourney';
import Summer2022NormalTourney from './pages/Summer2022NormalTourney';
import Winter2021NormalTourney from './pages/Winter2021NormalTourney';
import July2021Leaderboard from './pages/July2021Leaderboard';
import May2021Leaderboard from './pages/May2021Leaderboard';
import April2021Leaderboard from './pages/April2021Leaderboard';
import ThreeversusThreeTourneyIII from './pages/ThreeversusThreeTourneyIII';
import ThreeversusThreeTourneyII from './pages/ThreeversusThreeTourneyII';
import ThreeDayModdedNormalTourney from './pages/ThreeDayModdedNormalTourney';
import FirstHentaiHaven from './pages/FirstHentaiHaven';
import FifthNormalTourney from './pages/FifthNormalTourney';
import KingOfFighters2019 from './pages/KingOfFighters2019';
import FourthNormalTourney from './pages/FourthNormalTourney';
import ThirdNormalTourney from './pages/ThirdNormalTourney';
import SecondNormalTourney from './pages/SecondNormalTourney';
import FirstNormalTourney from './pages/FirstNormalTourney';
import AdminSuccess from './pages/AdminSuccess';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="lg:ml-64 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournamentHistoryLoad" element={<TournamentHistoryLoad />} />
          <Route path="/pickups" element={<ShowSinglePlayerPickups />} />
          <Route path="/regimentRecordsLoad" element={<RegimentRecordsLoad />} />
          <Route path="/adminLoad" element={<AdminLoad />} />
          <Route path="/kumiteSeason1" element={<KumiteSeason1 />} />
          <Route path="/kumiteSeason2" element={<KumiteSeason2 />} />
          <Route path="/kumiteSeason3" element={<KumiteSeason3 />} />
          <Route path="/kumiteSeason4" element={<KumiteSeason4 />} />
          <Route path="/kumiteSeason5" element={<KumiteSeason5 />} />
          <Route path="/kumiteSeason6" element={<KumiteSeason6 />} />
          <Route path="/summer2023NormalTourney" element={<Summer2023NormalTourney />} />
          <Route path="/summer2022NormalTourney" element={<Summer2022NormalTourney />} />
          <Route path="/winter2021NormalTourney" element={<Winter2021NormalTourney />} />
          <Route path="/july2021Leaderboard" element={<July2021Leaderboard />} />
          <Route path="/may2021Leaderboard" element={<May2021Leaderboard />} />
          <Route path="/april2021Leaderboard" element={<April2021Leaderboard />} />
          <Route path="/threeVersusThreeTourneyIII" element={<ThreeversusThreeTourneyIII />} />
          <Route path="/threeVersusThreeTourneyII" element={<ThreeversusThreeTourneyII />} />
          <Route path="/threeDayModdedNormalTourney" element={<ThreeDayModdedNormalTourney />} />
          <Route path="/FHH" element={<FirstHentaiHaven />} />
          <Route path="/fifthNormalTourney" element={<FifthNormalTourney />} />
          <Route path="/kingOfFighters2019" element={<KingOfFighters2019 />} />
          <Route path="/fourthNormalTourney" element={<FourthNormalTourney />} />
          <Route path="/thirdNormalTourney" element={<ThirdNormalTourney />} />
          <Route path="/secondNormalTourney" element={<SecondNormalTourney />} />
          <Route path="/firstNormalTourney" element={<FirstNormalTourney />} />
          <Route path="/adminSuccess" element={<AdminSuccess />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;