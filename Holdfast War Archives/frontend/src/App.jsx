import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StatisticsLoad from './pages/StatisticsLoad';
import ShowSinglePlayerPickups from './pages/ShowSinglePlayerPickups';
import CompareTwoPlayerPickups from './pages/CompareTwoPlayerPickups';
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
import ThreeversusThreeTourneyI from './pages/ThreeversusThreeTourneyI';
import ThreeDayModdedNormalTourney from './pages/ThreeDayModdedNormalTourney';
import FirstHentaiHaven from './pages/FirstHentaiHaven';
import FifthNormalTourney from './pages/FifthNormalTourney';
import KingOfFighters2019 from './pages/KingOfFighters2019';
import FourthNormalTourney from './pages/FourthNormalTourney';
import ThirdNormalTourney from './pages/ThirdNormalTourney';
import SecondNormalTourney from './pages/SecondNormalTourney';
import FirstNormalTourney from './pages/FirstNormalTourney';
import AdminSuccess from './pages/AdminSuccess';
import Matchmaking from './pages/Matchmaking';
import Regiment2BIR from './pages/Regiment2BIR';
import Regiment26th from './pages/Regiment26th';
import Regiment45e from './pages/Regiment45e';
import Regiment63e from './pages/Regiment63e';
import RegimentKRA from './pages/RegimentKRA';
import Regiment77th from './pages/Regiment77th';
import Regiment7Fuß from './pages/Regiment7Fuß';
import RegimentNo16 from './pages/RegimentNo16';
import RegimentTRR from './pages/RegimentTRR';
import RegimentTRRB from './pages/RegimentTRRB';
import LeagueHistoryLoad from './pages/LeagueHistoryLoad';
import '@fortawesome/fontawesome-free/css/all.min.css';
import TwoversusTwoMayTourney from './pages/TwoversusTwoMayTourney';
import FiveversusFiveTourneySept2020 from './pages/FiveversusFiveTourneySept2020';
import XMGFiveVersusFiveTourneyApril2020 from './pages/XMGFiveVersusFiveTourneyApril2020';
import RisksNA3v3Tourney from './pages/RisksNA3v3Tourney';
import XMG2v2Unrestricted from './pages/XMG2v2Unrestricted';
import TwoVersusTwoMay2020NormalTourney from './pages/TwoVersusTwoMay2020NormalTourney';
import HMSNA3Versus3TourneyII from './pages/HMSNA3Versus3TourneyII';
import HMSNA3Versus3TourneyI from './pages/HMSNA3Versus3TourneyI'
import RGLSeason1 from './pages/RGLSeason1';
import RGLSeason2 from './pages/RGLSeason2';
import RGLSeason3 from './pages/RGLSeason3';
import RGLSeason4 from './pages/RGLSeason4';
import RGLSeason5 from './pages/RGLSeason5';
import NWLSeason2 from './pages/NWLSeason2';
import NWLSeason3 from './pages/NWLSeason3';
import NWLSeason4 from './pages/NWLSeason4';
import NWLSeason5 from './pages/NWLSeason5';
import NWLSeason6 from './pages/NWLSeason6';
import HALSeason1 from './pages/HALSeason1';
import HALSeason2 from './pages/HALSeason2';
import HRLSeason2 from './pages/HRLSeason2';
import HRLSeason3 from './pages/HRLSeason3';
import HRLSeason4 from './pages/HRLSeason4';
import HRLSeason5 from './pages/HRLSeason5';
import HCLSeason1 from './pages/HCLSeason1';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="lg:ml-64 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournamentHistoryLoad" element={<TournamentHistoryLoad />} />
          <Route path="/statisticsLoad" element={<StatisticsLoad />} />
          <Route path="/pickups" element={<ShowSinglePlayerPickups />} />
          <Route path="/comparePlayerPickups" element={<CompareTwoPlayerPickups />} />
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
          <Route path="/threeVersusThreeTourneyI" element={<ThreeversusThreeTourneyI />} />
          <Route path="/threeDayModdedNormalTourney" element={<ThreeDayModdedNormalTourney />} />
          <Route path="/FHH" element={<FirstHentaiHaven />} />
          <Route path="/fifthNormalTourney" element={<FifthNormalTourney />} />
          <Route path="/kingOfFighters2019" element={<KingOfFighters2019 />} />
          <Route path="/fourthNormalTourney" element={<FourthNormalTourney />} />
          <Route path="/thirdNormalTourney" element={<ThirdNormalTourney />} />
          <Route path="/secondNormalTourney" element={<SecondNormalTourney />} />
          <Route path="/firstNormalTourney" element={<FirstNormalTourney />} />
          <Route path="/adminSuccess" element={<AdminSuccess />} />
          <Route path="/matchMaking" element={<Matchmaking />} />
          <Route path="/regiment2.BIR" element={<Regiment2BIR />} />
          <Route path="/regiment26th" element={<Regiment26th />} />
          <Route path="/regiment45e" element={<Regiment45e />} />
          <Route path="/regiment63e" element={<Regiment63e />} />
          <Route path="/regiment77th" element={<Regiment77th />} />
          <Route path="/regiment7Fuß" element={<Regiment7Fuß />} />
          <Route path="/regimentKRA" element={<RegimentKRA />} />
          <Route path="/regimentNo.16" element={<RegimentNo16 />} />
          <Route path="/regimentTRR" element={<RegimentTRR />} />
          <Route path="/regimentTRRB" element={<RegimentTRRB />} />
          <Route path="/leagueHistory" element={<LeagueHistoryLoad />} />
          <Route path="/twoVersusTwoMay2021Tourney" element={<TwoversusTwoMayTourney />} />
          <Route path="/fiveVersusFiveSeptember2020Tourney" element={<FiveversusFiveTourneySept2020 />} />
          <Route path="/xmgFiveVersusFiveTourneyApril2020" element={<XMGFiveVersusFiveTourneyApril2020 />} />
          <Route path="/risksNA3v3Tourney" element={<RisksNA3v3Tourney />} />
          <Route path="/xmg2v2Unrestricted" element={<XMG2v2Unrestricted />} />
          <Route path="/twoVersusTwoMay2020NormalTourney" element={<TwoVersusTwoMay2020NormalTourney />} />
          <Route path="/hmsNAThreeVersusThreeTourneyII" element={<HMSNA3Versus3TourneyII />} />
          <Route path="/hmsNAThreeVersusThreeTourneyI" element={<HMSNA3Versus3TourneyI />} />
          <Route path="/rglSeason1" element={<RGLSeason1 />} />
          <Route path="/rglSeason2" element={<RGLSeason2 />} />
          <Route path="/rglSeason3" element={<RGLSeason3 />} />
          <Route path="/rglSeason4" element={<RGLSeason4 />} />
          <Route path="/rglSeason5" element={<RGLSeason5 />} />
          <Route path="/nwlSeason2" element={<NWLSeason2 />} />
          <Route path="/nwlSeason3" element={<NWLSeason3 />} />
          <Route path="/nwlSeason4" element={<NWLSeason4 />} />
          <Route path="/nwlSeason5" element={<NWLSeason5 />} />
          <Route path="/nwlSeason6" element={<NWLSeason6 />} />
          <Route path="/halSeason1" element={<HALSeason1 />} />
          <Route path="/halSeason2" element={<HALSeason2 />} />
          <Route path="/hrlSeason2" element={<HRLSeason2 />} />
          <Route path="/hrlSeason3" element={<HRLSeason3 />} />
          <Route path="/hrlSeason4" element={<HRLSeason4 />} />
          <Route path="/hrlSeason5" element={<HRLSeason5 />} />
          <Route path="/hclSeason1" element={<HCLSeason1 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;