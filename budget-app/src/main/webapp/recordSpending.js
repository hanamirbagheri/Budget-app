const buttonHeading = document.querySelector(".selected");
const optionsContainer = document.querySelector(".option-container");
 
const optionList = document.querySelectorAll(".option");
 
buttonHeading.addEventListener("click", () => {
   optionsContainer.classList.toggle("active");
});
 
// Loop through each option, if click on one then put it on heading
optionList.forEach( o => {
   o.addEventListener("click", () => {
       buttonHeading.innerText = o.querySelector("label").innerText;
       // Remove active state after choosing a type
       optionsContainer.classList.remove("active");
   })
})
 
// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
   if (!event.target.matches(".selected")) {
     var dropdowns = document.getElementsByClassName("option-container");
     var i;
     for (i = 0; i < dropdowns.length; i++) {
       var openDropdown = dropdowns[i];
       if (openDropdown.classList.contains("active")) {
         openDropdown.classList.remove("active");
       }
     }
   }
 };
