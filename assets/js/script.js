function fetchgo() {
        		// body...
        		let api = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?"
        		let data = new URLSearchParams();
        		let date = document.getElementById("date").value;
        		let formattedDate;
        		let div = document.getElementById("result");
        		let count = 0;
        		if(date){
        			let dateItems = date.split("-");
        			formattedDate = dateItems[2] + "-" + dateItems[1] + "-" + dateItems[0];
        		}
        		data.append("pincode",document.getElementById("pincode").value);
        		data.append("date",formattedDate);
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
        			console.log(sessions.length);
        			for(let index=0; index < sessions.length ; index++){
        				//div.innerHTML+='<div class="card col-3"><h4 class="name">'+sessions[index].name+'</h4><p class="address">'+sessions[index].address+'</p></div>'; 
        				div.innerHTML+="<div class='col-md-4'><div class='card p-3 mb-2'><div class='d-flex justify-content-between'><div class='d-flex flex-row align-items-center'><div class='icon'> <i class='bx bxl-mailchimp'></i> </div><div class='ms-2 c-details'><h6 class='mb-0'>"+sessions[index].vaccine+"</h6> <span>Age : "+sessions[index].min_age_limit+"+</span></div></div><div class='badge'> <span>"+sessions[index].fee_type+"</span> </div></div><div class='mt-5'><h3 class='heading'>Dose 1 Slots: "+sessions[index].available_capacity_dose1+"<br>Dose 2 Slots: "+sessions[index].available_capacity_dose2+"</h3><div class='mt-5'> <span class='text1'>"+sessions[index].name+" </span><p class='address'>"+sessions[index].address+"</p> </div></div></div></div>";
        			}
        			//console.log(json.sessions);
        		})
        		.catch(function(error){
        			console.log(error);
        		})
        		//console.log(data.toString());
        		return false;
        	}
