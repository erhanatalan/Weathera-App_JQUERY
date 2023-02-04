const formJS = document.querySelectorAll("form")[0]
console.log(formJS)
// const formJQ = jQuery("form")
// const formJQ = $("form")[0] //? $ kisayol [0] js e cevirir
const formJQ = $("form").eq(0) //? $ kisayol eq ile jquery objesi olmaya devam eder.
// const formJQ = $("form").on("submit") //? tum formlara submit ozeeligi eklenebilir 
//? selectors ==> eq , th , odd, even
console.log(formJQ)
console.log($(formJQ))

const inputJQ = $("input")
// ? console.log(inputJQ.val()) value degeri ile aynidir ekstra deger leklenebilir.
const msgJQ = $(".msg")
const listJQ = $(".ajax-section .cities")


// JS load event
window.addEventListener("load", ()=>{console.log("loaded")})
// JQUERY load event
$(window).on("load", ()=>{console.log("jq loaded")} )
//? onload , onclick ==> js + jquery

// ? js DOM Contentloaded
document.addEventListener("DOMContentLoaded", ()=>{
    console.log("js dom is ready");
    localStorage.setItem("apiKey", EncryptStringAES('e4250f2ef56c660157052328f91b9e35'));
})
// ? jq DOM Contentloaded
// $(document).on("DOMContentLoaded", ()=>{console.log("jq dom is ready")})
// $(document).ready(()=>{
//     console.log("jquery dom is ready!")
// });
// ready = addEventListener("DOMContentLoaded")


formJQ.submit((e)=>{
    e.preventDefault();
    getWeatherDataFromApi();

})

const getWeatherDataFromApi = async () =>{
    const apiKey = DecryptStringAES(localStorage.getItem("apiKey"));
    const cityNameInput= inputJQ.val()
    const units = "metric";
    const lang = "tr";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput}&appid=${apiKey}&units=${units}&lang=${lang}`

    //  ? jq http request
    // const response = await $.get(url);
    // const response = await $.post(url); 
    await $.ajax({
        type : "GET",
        url : url,
        dataType : "json",
        success: (response) => {
            console.log(response)
        },
        beforeSend : (request) => {
            //parameter => headers 
            //send tokenKey =>
        },
        complete : ()=>{},
        error : (XMLHttpRequest) =>{
            //  error handling
        }
    })
}





















