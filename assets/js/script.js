
$(function() {
    $( "#date" ).datepicker({
        dateFormat:"dd-mm-yy"
    });
    $("#reset").click(function(){
        
        let div = document.getElementById("result");
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    });
});
function fetchgo() {
    //analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-1T7G7V3JVH');
    //operation
    let api = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?"
    let data = new URLSearchParams();
    console.log(date);
    let formattedDate;
    let div = document.getElementById("result");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    let count = 0;
    data.append("pincode",document.getElementById("pincode").value);
    data.append("date",document.getElementById("date").value);
    fetch(api+data.toString(), {
        method: "get"
    })
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        return json.sessions;
    })
    .then((sessions)=>{
        if(sessions.length==0){
            div.innerHTML+="<div class='error col-md-4'><div class='error card p-3 mb-2'><div class='d-flex justify-content-between'><div class='d-flex flex-row align-items-center'><div class='ms-2 c-details'>Opps! No Slots available in your area.</div></div></div></div></div>"
        }else{
            for(let index=0; index < sessions.length; index++){
                let dose1 = sessions[index].available_capacity_dose1;
                let dose2 = sessions[index].available_capacity_dose2;
                let dose = "";
                if(dose1 == 0){
                    colordose1 = "dosered";
                }else{
                    colordose1 = "dosegreen"
                }
                if(dose2 == 0){
                    colordose2 = "dosered";
                }else{
                    colordose2 = "dosegreen"
                }
                div.innerHTML+="<div class='dosered col-md-4'><div class='card p-3 mb-3'><div class='d-flex justify-content-between'><div class='d-flex flex-row align-items-center'><div class='icon'> <i class='bx bxl-mailchimp'></i> </div><div class='ms-2 c-details'><h6 class='mb-0'>"+sessions[index].vaccine+"</h6> <span>Age : "+sessions[index].min_age_limit+"+</span></div></div><div class='badge "+sessions[index].fee_type+"'> <span>"+sessions[index].fee_type+"</span> </div></div><div class='mt-1'><h3 class='heading'><span class='"+colordose1+"'>Dose 1 Slots: "+sessions[index].available_capacity_dose1+"</span><br><span class='"+colordose2+"'>Dose 2 Slots: "+sessions[index].available_capacity_dose2+"</span></h3><div class='mt-2'> <span class='text1'>"+sessions[index].name+" </span><p class='address'>"+sessions[index].address+"</p> </div></div></div></div>";
            }
        }
    })
    .catch(function(error){
        console.log(error);
    })
    return false;
}
