let errors = {};

$('#badgeform').submit((e)=>{
    e.preventDefault();
    const formData = $('#badgeform').serializeArray();
    const data = {};
    $(formData).each((index, obj)=>{
        data[obj.name] = obj.value;
    })
    console.log(data);
    errors = {};
    // title
    if(data.title.length < 1){
        if(!errors.title){
            errors.title = [];
            errors.title.push("Title required");
        }else{
            errors.title.push("Title required");
        }
        
    }if(data.title.length > 0 && !data.title.match(/[A-Za-z0-9]/g)){
        if(!errors.title){
            errors.title = [];
            errors.title.push("Title cannot contain special characters");
        }else{
            errors.title.push("Title cannot contain special characters");
        }
    }
    // descriptions
    if(!data.description1){
        errors.description1 = "First event description required";
    }
    if(!data.description2){
        errors.description2 = "Second event description required";
    }
    if(!data.description3){
        errors.description3 = "Third event description required";
    }


    if(JSON.stringify(errors) == "{}"){
        $(e.currentTarget).off('submit');
        $(e.currentTarget).submit();
        console.log('everything is not fine')
    }else{
        $('.error-window').empty();
        $('.error-window').append((errors.title ? errors.title + '<br>': '') + (errors.description1 ? errors.description1 + '<br>': '') + (errors.description2 ? errors.description2 + '<br>': '') + (errors.description3 ? errors.description3 + '<br>': ''));
        console.log(errors);
    }
})