function addRecord() {
		    // get values
		    var fullname = $("#fullname").val();
		    var username = $("#username").val();
		    var email = $("#email").val();
		    if((fullname == '') ||(username == '')||(email == '')){
		    	alert("None of the fields can't be empty");
		    }else{
		    // Add record
			    $.post("addRecord.php", {
			        fullname: fullname,
			        username: username,
			        email: email
			    }, function (data, status) {
			        // close the popup
			        $("#add_new_record_modal").modal("hide");
			        // read records again
			        readRecords();
			 
			        // clear fields from the popup
			        $("#fullname").val("");
			        $("#username").val("");
			        $("#email").val("");
			    });
			}
		}
		 
		// READ records
		function readRecords() {
		    $.get("readRecords.php", {}, function (data, status) {
		        $(".records_content").html(data);
		    });
		}
		$(document).ready(function(){
			readRecords();
		});
		//Delete user from the table
		function DeleteUser(id) {
		    var conf = confirm("Are you sure, do you really want to delete User?");
		    if (conf == true) {
		        $.post("deleteUser.php", {
		                id: id
		            },
		            function(data, status) {
		                readRecords(); // this really optimize the code..
		            }
		        );
		    }
		}
		//view info 
		function GetUserDetails(id) {
		    // Add User ID to the hidden field for furture usage
		    $("#hidden_user_id").val(id);
		    $.post("readUserDetails.php", {
		            id: id
		        },
		        function (data, status) {
		            // PARSE json data
		            var user = JSON.parse(data);
		            // Assing existing values to the modal popup fields
		            $("#update_fullname").val(user.fullname);
		            $("#update_username").val(user.username);
		            $("#update_email").val(user.email);
		        }
		    );
		    // Open modal popup
		    $("#update_user_modal").modal("show");
		}
		//update users modal
		function Profile(id){
			$("#hidden_user_id").val(id);
           $.post("readUserDetails.php",{id: id}, function(data, status){
           		//Parse Json data 
           		var user = JSON.parse(data);
           		//dispaly the json returned data 
           		$(".modal-body #myname").html(user.fullname);
           		$(".modal-body #myusername").html(user.username);
           		$(".modal-body #myemail").html(user.email);
           		

           });

           $("#profile_view_modal").modal("show");
		}
	
		function UpdateUserDetails() {
		    // get values
		    var fullname = $("#update_fullname").val();
		    var username = $("#update_username").val();
		    var email = $("#update_email").val();
		 
		    // get hidden field value
		    var id = $("#hidden_user_id").val();
		    // Update the details by requesting to the server using ajax
		    $.post("updateUserDetails.php", {
		            id: id,
		            fullname: fullname,
		            username: username,
		            email: email
		        },
		        function (data, status) {
		            $("#update_user_modal").modal("hide");
		            readRecords();
		        }
		    );
		}
