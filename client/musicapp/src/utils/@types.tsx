import { ReactNode } from "react";


export interface IMAGE {
    publicId:string;
     url:string;
  }

  export interface AVATAR {
    publicId:string;
     url:string;
  }


  export interface SONGFILE {
    publicId:string;
     url:string | null;
  }

 export interface StringArray {
    [index: number]: string | undefined;
  }




  export interface PRICE {
    price:string;
    plans:string;
    duration:string;
    status:string;
    active:boolean

  }
 
  export interface SUB {
    user:USER;
    pricing:PRICE
    bill:number;
    start_date:string,
    end_date:string,
    status:string
    payment_status:string;
    payment:boolean
   


  }



  export interface ORDER {
    id:string
    owner:string;
    bill:number;
    paymentid:string;
    payment:boolean;
    pricing:PRICE
    order_date:string
  }
  


  


  export interface USER {
    id:string
    first_name:string;
    last_name:AVATAR;
    email:string
    username:string
    is_staff:boolean
    is_active:boolean
    date_joined:string
 }

 
 export interface ARTIST {
  name:string;
  cover_image:AVATAR;
  bio:string
  followers:string
  __v:number

}

  export interface ALBUM {
    title:string;
    artist:string;
    cover_image:string
    release_year:string;
 

 }

  export interface GENRE {
    title:string
    cover_image:string
    
 }

 
 export interface TRACK  {

  length: ReactNode;
  id:string
  title:string;
  artist:ARTIST;
  genre:GENRE;
  album:ALBUM;
  duration:number
  date_added:string
  likes:number
  release_year:string
  cover_image:string
  audio_file:string
  times_played:number
}

 export interface PLAYLIST {
  id: string;
  user:USER
  title:string;
  tracks:TRACK | null;

}

export type audioDisplayType = {
    onLoadedMetadata:() => void;
}

export interface USER {
    _id: string,
    email: string,
    username: string,
    firstname: string,
    lastname: string,
    register_date: string,
    last_seen:string
    role:string,
    __v: number
  }
  
  

  
export type authType = {
    Logout:() => void;
    isAuthenticated:boolean;
    updateUser:USER|null ;
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>;

  };

  export type playlistType = {
    createPlaylist:() => void
    Playlist:PLAYLIST[]
    deleteFromPlaylist:(arg0: TRACK, arg1:PLAYLIST ) => void
    addToplaylist:(arg0: TRACK, arg1:PLAYLIST) => void
    clearPlaylist:(arg0: PLAYLIST) => void
    addPlayed:(arg0: TRACK) => void
    deletePlaylist:( arg1:PLAYLIST ) => void
  };

  
  
export type checkoutType = {
  
    createPayment:(arg0: PRICE) => void
    stripePromise:string,
    clientSecret:string,
    currentOrder:ORDER | null
    currentSub:SUB | null


  };



export type audioControlType = {
     timeProgress:number,
     audioRef:React.LegacyRef<HTMLAudioElement>
     progressBarRef:React.LegacyRef<HTMLInputElement>;
setDuration:React.Dispatch<React.SetStateAction<number>>
 volume:number;
 mutevolume:boolean;
setTimeProgress:React.Dispatch<React.SetStateAction<number>>
duration:number;
setVolume:React.Dispatch<React.SetStateAction<number>>;
setMuteVolume:React.Dispatch<React.SetStateAction<boolean>>

}