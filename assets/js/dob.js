var yearStart = 1955;
var yearEnd = new Date().getFullYear();
var yearOptions = "";
for(var year = yearStart ; year <= yearEnd; year++){
  yearOptions += "<option value="+ year +" >"+ year +"</option>";
}

var dayStart = 1;
var dayEnd = 31;
var dayOptions = "";
for(var day = dayStart ; day <= dayEnd; day++){
  dayOptions += "<option value="+ day +" >"+ day +"</option>";
}

var monthStart = 1;
var monthEnd = 12;
var monthOptions = "";
for(var month = monthStart ; month <= monthEnd; month++){
  monthOptions += "<option value="+ month +" >"+ month +"</option>";
}
window.onload = function(){
  document.getElementById("year").innerHTML = yearOptions;
  document.getElementById("day").innerHTML = dayOptions;
  document.getElementById("month").innerHTML = monthOptions;
}
