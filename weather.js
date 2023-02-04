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
            const {main, sys, weather, name} = response
            const iconUrlAWS = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;
            //alternative iconUrl
            const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

            const cityCardList = listJQ.find("city")
            const cityCardListArray = cityCardList.get() //? array e ceviriyor
            if(cityCardListArray.length > 0 ){
                const filteredArray = cityCardListArray.filter(card => $(card).find("span").text() == name )
                if(filteredArray.length > 0){
                    msgJQ.text(`You already know the weather for ${name}, Please search for another city 😉`);
                    //styling
                    msgJQ.css({ "color": "red", "text-decoration": "underline" });
                    setTimeout( ()=>{
                        msgJQ.text(``)
                    },3000)
                    formJQ.trigger("reset")
                    return
                }
            }


            const createdLi = $("<li></li>")
            createdLi.addClass("city");
            createdLi.html(`
            <h2 class="city-name" data-name="${name}, ${sys.country}">
                <span>${name}</span>
                <sup>${sys.country}</sup>
            </h2>
            <div class="city-temp">${Math.round(main.temp)}
                <sup>°C</sup>
            </div>
            <figure>
                <img class="city-icon" src="${iconUrlAWS}">
                <figcaption>${weather[0].description}</figcaption>
            </figure>
        `)

            listJQ.prepend(createdLi)
            // formJQ[0].reset() alternative
            formJQ.trigger("reset")

            // animation
            $("city").click((e)=>{
                $(e.target)
                    .animate({left:"50px"})
                    .animate({left:"150px"})
                    .animate({left:"250px"})
                    .animate({left:"150px"})
                    .animate({left:"50px"})
                    .animate({left:"0px"})
            })
            //jquery slideup-slidedown
            $(".city img").click((e) => {
                //convert js to jquery
                //jquery chaning
                $(e.target)
                    .slideUp(1500)
                    .slideDown(1500)
            });

            //jquery slideup-slidedown
            // $(".city img").click((e) => {
            //     $(e.target)
            //         .hide()
            // });

        },
        beforeSend : (request) => {
            //parameter => headers 
            //send tokenKey =>
        },
        complete : ()=>{},
        error : (XMLHttpRequest) =>{
            msgJQ.text(`${XMLHttpRequest.status} ${XMLHttpRequest.statusText}`);
            //styling
            msgJQ.css({ "color": "red", "text-decoration": "underline" });
            setTimeout( ()=>{
                msgJQ.text(``)
            },3000)
            formJQ.trigger("reset")
            //  error handling
        }
    })
}





















