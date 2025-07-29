import {Row} from "react-bootstrap"
import LatestTrack from "./HomeCenter/LatestTrack/LatestTrackMenu"
import Artists from "./HomeCenter/Artists/Artists";
import Genres from "./HomeCenter/Genres/Genres";
import Albums from "./HomeCenter/Album/Album";

import NavSearchResults from "../../components/NavBar/NavSearch/NavSearchResults";
 import RecentlyPlayedMenu from "./HomeCenter/RecentlyPlayed/RecentlyPlayedMenu";
 import {  getSearchTerm } from "../../redux/features/audio/audioSlice"
 import { useAppSelector } from "../../redux/app/hook";
import MostPlayedMenu from "./HomeCenter/MostPlayed/MostPlayedMenu";
const Center = () => {


const searchTerm = useAppSelector(getSearchTerm)

  return (
    <div  className="col pb-5     homecenter-text rounded px-2 mt-3 rounded-3  vh-100   homeCenter   text-light ">
      <Row className="  ">
      <div  className="col pb-5    mt-3 rounded  mt-3 rounded     text-light ">
      <Row className=" ">
      {!searchTerm ? (<div className="pb-5 artist-bg">
        <Artists />
<Genres />

<Albums />
 <LatestTrack /> 
<MostPlayedMenu />
<RecentlyPlayedMenu/>  

    </div>
      ) : 
      (<div>
        <NavSearchResults />
      </div>) } 
      </Row>
  </div>
  </Row>
  </div>
  
  )
}

export default Center;