const baseurl = "http://numbersapi.com"
const num_input = document.querySelector(".searchinput");
const num_button = document.querySelector(".searchbutton");
const numContainer = document.querySelector(".fact-cont");

async function get4numberfacts(num){
    let fourFacts = await Promise.all([
        axios.get(`${baseurl}/${num}/math`),
        axios.get(`${baseurl}/${num}/math`),
        axios.get(`${baseurl}/${num}/math`),
        axios.get(`${baseurl}/${num}/math`),{
            headers:{
                 "content-type": "application/json"
            }
        }
    ]);
    
   console.log(fourFacts[0])
   console.log(fourFacts[1])
   console.log(fourFacts[2])
   console.log(fourFacts[3])
   return fourFacts
}

num_button.addEventListener('click' ,async function(){
    const input_val = num_input.value;
    //calls back async function with input value to manipulate url
    const allfacts = await get4numberfacts(input_val);
    const newfact = `<div>
            <h3>Facts about your favorite number : ${input_val}</h3>
            <p>${allfacts[0].data}</p>
            <p>${allfacts[1].data}</p>
            <p>${allfacts[2].data}</p>
            <p>${allfacts[3].data}</p>
         </div>`
         numContainer.innerHTML += newfact
})





