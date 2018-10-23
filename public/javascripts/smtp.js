function send() {
    $(document).ready(function(){
        var from,to,subject,text;
        $("#send_email").click(function(){      
            to=$("#to").val();      
            $("#message").text("Sending E-mail...Please wait");
            $.get("http://localhost:3000/users/send",{to:to},function(data){
                if(data=="sent")
                {
                    $("#message").empty().html("<p>Email is been sent at "+to+" . Please check inbox !</p>");
                }
            });
        });
    });
}

send();