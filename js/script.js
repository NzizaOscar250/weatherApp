const closeBtn=document.querySelector('#close-btn'),
modal=document.querySelector("#modal"),
submit=document.querySelector('#weatherForm'),
apiKey=`7a133c87df30418088a151640230408`;

const modalInfo=document.querySelector("#modalWeatherInfo")

submit.addEventListener('submit',function(e){
    e.preventDefault()
    const data= document.querySelector("input").value;
    if(data != ""){
        getWeather(data);
    }
    modal.style.display="block"
})

closeBtn.addEventListener('click',function(){
    modal.style.display="none"
})

window.addEventListener('click',function(e){
    if(e.target === modal){
        modal.style.display="none" 
    }
})


async function getWeather(city){
    
const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    try {
        const response = await fetch(url);
         const data= await response.json();

         const {current,location}=data;
        console.log(current)
       
           
  const newImageUrl= new URL(current.condition.icon,"http://example.com/something");
  const icon = newImageUrl.pathname.substring(1);
//   console.log(icon)
        modalInfo.innerHTML =`<div class="left">
        <div class="img">
            <img src="${icon}" alt="" srcset="">
        </div>
        </div>
        
        <div class="right">
            <h1>${current.feelslike_c}°C</h1>
        <div class="foot-model">
            <h3>${current.condition.text}</h3>
            <h5>${location.name}</h5>
        </div>
        </div>`

         
    } catch (error) {
        modalInfo.innerHTML ="<p style='color:red;font-weight:bold'>Invalid Location</p>"
        console.log(error)
    }
}

