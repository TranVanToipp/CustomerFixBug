function deleteRows() {
	var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
	var checkboxesNot = document.querySelectorAll('input[type="checkbox"]:not(:checked)');
	console.log(checkboxes);
	var selectedValues = [];
	for (var i = 1; i < checkboxes.length; i++) {
		 if (checkboxes[i].checked) {
	  		selectedValues.push(checkboxes[i].value);
		} 
	}
	if (checkboxesNot.length == checkboxes.length){
		 selectedValues.shift();
	}
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
	    console.log(this.responseText);
	  }
	};
	xhttp.open("POST", "/CustomerSystem_Servlet_Jsp/T002", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("selectedValues=" + JSON.stringify(selectedValues));
} 

function deleteData() {
	  var checkboxes = document.getElementsByName("checkboxAll");
	  var selectedIds = [];
	  for (var i = 0; i < checkboxes.length; i++) {
	    if (checkboxes[i].checked) {
	      selectedIds.push(checkboxes[i].value);
	    }
	  }
	  if (selectedIds.length > 0) {
	    var xhr = new XMLHttpRequest();
	    xhr.open("POST", "/CustomerSystem_Servlet_Jsp/T002", true);
	    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    xhr.onreadystatechange = function() {
	      if (xhr.readyState == 4 && xhr.status == 200) {
	        // Xóa thành công, cập nhật lại dữ liệu trên trang hiện tại
	        location.reload();
	      }
	    }
	    xhr.send("ids=" + selectedIds.join(","));
	  }
	}
	checkBox = (source) => {
		var checkBoxAll = document.getElementsByName("checkboxAll");
		for (var i = 0; i < checkBoxAll.length; i++) {
			checkBoxAll[i].checked = source.checked;
		}
	}
	
	
	isValidDate = (txtDate) => {
		var currVal = txtDate;
		if (currVal == '') {
			return false;
		}
		 var rxDatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/; 
		 var dtArray = currVal.match(rxDatePattern); 
		 
		 if (dtArray == null) 
		      return false;
		 //check for mm/dd/yyyy format.\
		 dtMonth = dtArray[3];
		 dtDay = dtArray[5];
		 dtYear = dtArray[1];
		 
		 if (dtMonth < 1 || dtMonth > 12) {
			 return false;
		 }else if (dtDay < 1 || dtDay > 31) {
			 return false; 
		 }else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31) 
			 return false;
		 else if (dtMonth == 2) {
			 var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
		        if (dtDay> 29 || (dtDay ==29 && !isleap)) 
		                return false;
		 }
		 return true;
	}
	
	function validateForm() {
		  const dateStringFrom = document.querySelector(".txtCustomerValidateFROM").value;
		  const dateStringTo = document.querySelector(".txtCustomerValidateTO").value;
		  if(!isValidDate(dateStringFrom)) {
		    alert("Invalid Birthday (From).");
		    return false;
		  }
		  if (!isValidDate(dateStringTo)) {
			  alert("Invalid Birthday (To).");
			  return false;
		  }
	  	 var dateFromUpdate = dateStringFrom.split("/").join("");
		 var dateToUpdate =  dateStringTo.split("/").join("");
		 console.log(dateFromUpdate);
		 console.log(dateToUpdate);
		 if (dateFromUpdate > dateToUpdate) {
			alert("There is an error in the range input of Birthday");
		 }
		  return true;
		}
	
	const dateFrom = document.querySelector(".txtCustomerValidateFROM").value;
	const dateTo = document.querySelector(".txtCustomerValidateTO").value;