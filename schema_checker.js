const body = {
    name: "William Loopesko",
    age: 33,
    founder: true,
    company: "Aclymate",
    address: {
        description: "2432 S. Downing St, Denver, CO, 80210",
        county: "Denver",
        country: "USA"
    }
}

const schema = {
    name: {type: "string", required: true},
    age: {type: "number", required: true},
    founder: {type: "boolean", required: false},
    company: {type: "string", required: true},
    address: {
        type: "object",
        required: true,
        description: {type: "string", required: true},
        county: {type: "string", required: false},
        country: {type: "string", required: false}
    }
}
function schemaChecker(object, schema) {
    for(let item in schema){
        if(schema[item].required){
            if(!(item in object)){
                return false;
            }
            if(typeof(object[item]) !== schema[item].type){
                return false;
            }
            if(schema[item].type === "object"){
                if(!schemaChecker(object[item], schema[item])){
                    return false;
                }
            }
        }
    }
    return true;
}

if(schemaChecker(body, schema)){
    console.log("Body matches schema");
}
else{
    console.log("Body does not match schema");
}
