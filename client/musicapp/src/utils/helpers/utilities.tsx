
export const capitalizeFirstLetter = (word:string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }


  export const timeConverter =(totalSeconds:number  ) => {
    
    //Calculate minutes and seconds
   const minutes = Math.trunc(totalSeconds / 60)
   const seconds = Math.floor(totalSeconds % 60)
   const formattedSeconds = seconds.toString().padStart(2, '0'); // Add leading zero

    // return the result
    return `${minutes}:${formattedSeconds} `
  }


  