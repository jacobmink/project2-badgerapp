let errors = {};

$('#regform').submit((e)=>{
    e.preventDefault();
    const formData = $('#regform').serializeArray();
    const data = {};
    $(formData).each((index, obj)=>{
        data[obj.name] = obj.value;
    })
    console.log(data);
    errors = {};
    // username
    if(data.username.length < 1){
        if(!errors.username){
            errors.username = [];
            errors.username.push("Username required");
        }else{
            errors.username.push("Username required");
        }
        
    }if(data.username.length > 0 && !data.username.match(/[A-Za-z0-9]/g)){
        if(!errors.username){
            errors.username = [];
            errors.username.push("Username cannot contain special characters");
        }else{
            errors.username.push("Username cannot contain special characters");
        }
    }
    // password
    if(!data.password){
        errors.password = "Password required";
    }
    // email
    if(!data.email){
        if(!errors.email){
            errors.email = [];
            errors.email.push("Email required");
        }else{
            errors.email.push("Email required");
        }
    }if(data.email && !data.email.match(/@/g)){
        if(!errors.email){
            errors.email = [];
            errors.email.push("Email must be valid");
        }else{
            errors.email.push("Email must be valid");
        }
    }
    // displayName
    if(!data.displayName){
        errors.displayName = "Display name required";
    }
    // photo
    if(!data.img){
        errors.img = "Photo link required";
    }


    if(JSON.stringify(errors) == "{}"){
        console.log('everything is fine')
        $(e.currentTarget).off('submit');
        $(e.currentTarget).submit();
        console.log('everything is not fine')
    }else{
        $('#errorWindow').empty();
        $('#errorWindow').append((errors.username ? errors.username + '<br>': '') + (errors.password ? errors.password + '<br>': '') + (errors.email ? errors.email + '<br>': '') + (errors.displayName ? errors.displayName + '<br>': '') + (errors.img ? errors.img + '<br>': ''));
        console.log(errors);
    }




})