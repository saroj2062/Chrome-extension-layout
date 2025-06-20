const visibilityBtm = document.getElementById("btm-visibility");
const filterAllBtm =document.getElementById("btm-filter-all");
const filterActiveBtm = document.getElementById("btm-filter-active");
const filterInactiveBtm = document.getElementById("btm-filter-inactive");
const remove = document.getElementById("remove-btm");
const container = document.querySelector(".extensions-list-container");
let extenData = [],tempData=[]; 


// data fetching 
const fetchedData = async (state) => {
try{
    const response = await fetch("data.json");
    const data = await response.json();

    extenData = data;
     tempData = [...extenData];
     creatingExtension(tempData,state);
}
catch(error)
{
    console.log("Error in Fetching Data");
}
};

// removing extensin 
const removeExtend = (vIndex)=>{

tempData =  tempData.filter((data,index)=>(
  index !== vIndex)
)

creatingExtension(tempData);

}
//check box working function
const updateExten = (vindex) =>{
  tempData[vindex].isActive = !tempData[vindex].isActive;
  creatingExtension(tempData);
}
 // Light and dark mode 
const visibilityState = ()=>{
  const visibleBtm =document.getElementById("logo");

  if( document.body.classList.contains("light"))
  {
    document.body.classList.remove("light");
    visibleBtm.src="assets/icon-sun.svg"

  }
  else{
     document.body.classList.add("light");
    visibleBtm.src="assets/icon-moon.svg"
  }
}
// creating extension
const creatingExtension = (dataColl,state) => {

 let filterData = dataColl;

 if(state === "Active")
 {
  filterData = dataColl.filter((data)=>{
   return data.isActive;
  })
}
  else if(state === "Inactive"){
    filterData = dataColl.filter((data)=>{
     return !data.isActive;

  })
}
container.innerHTML = ""; // clear existing
filterData.forEach((data,index) => {
    container.innerHTML += `
      <div class="extension">
        <div class="ext-detail">
          <img src="${data.logo}" alt="">
          <div class="detail">
            <h5 id="name">${data.name}</h5>
            <p>${data.description}</p>
          </div>
        </div>
        <div class="exten-btm">
          <button onclick="removeExtend(${index})">Remove</button>
          <label class="switch">
            <input id="check-input" onChange="updateExten(${index})" type="checkbox" ${data.isActive ? "checked" : ""}>
            <span class="slider"></span>
          </label>
        </div>
      </div>`;
  });
};

filterActiveBtm.addEventListener("click",()=>(creatingExtension(tempData,"Active")));
filterInactiveBtm.addEventListener("click",()=>(creatingExtension(tempData,"Inactive")));
filterAllBtm.addEventListener("click",()=>(creatingExtension(tempData)));
visibilityBtm.addEventListener("click",visibilityState);
fetchedData();
