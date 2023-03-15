var sightsageLogo = document.querySelector("h6");

function vanishLogo(){
  if (screen.width <= 500){
    sightsageLogo.innerHTML = "";
  }
  else{
    sightsageLogo.innerHTML = "By SightSage Food and Nutrition Inc.";
  }
}

vanishLogo()
