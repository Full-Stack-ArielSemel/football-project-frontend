export default function errorMessagesFromServer(props){

    let codeNumber = props.message;
    let message = "";

    switch (codeNumber){

        case 1000:
            message = "username is missing";
            break;

        case 1001:
            message = "password is missing";
            break;

        case 1002:
            message = "Invalid Username";
            break;

        case 1003:
            message = "Invalid Password";
            break;
        
        case 1004:
            message = "Username NOT FOUND"
            break;
        
        case 1005:
            message = "Username must be at least 6 characters"
            break;

        case 1006:
            message = "Username must include letters"
            break;

        case 1007:
            message = "Password must be at least 8 characters"
            break;
        
        case 1008:
            message = "Password must contain a capital letter"
            break;

        case 1009:
            message = "Password must contain a lower letter";
            break;

        case 1010:
            message = "Password must contains a digit";
            break;

        case 1011:
            message = "Username must start with a letter"

        case 1012:
            message = "Password must start with lettet or digit";
            break;

        case 1013:
            message = "This username is already exist";
            break;

        case 1014:
            message = "Wrong Login Creds";
            break;

        case 1015:
            message = "No such Token";
            break;

        case 1016:
            message = "Home team doesnt exist";
            break;

        case 1017:
            message = "Away team dowsnt exist";
            break;

        case 1018:
            message = "Home team already in live";
            break;

        case 1019:
            message = "Away team already in live";
            break;

        case 1020:
            message = "You can not choosing two identical teams";
            break;

        case 1021:
            message = "This game not in live";
            break;

        case 1022:
            message = "Home team doesnt exist in this league";
            break;

        case 1023:
            message = "Away team doesnt exist in this league";
            break;
        
        case 1024:
            message = "This league doesnt exist";
            break;

        case 1025:
            message = "Username contains space";
            break;

        case 1026:
            message = "Password contains space";
            break;
        
        default:
            break;
    }

    return(
        <div style={{color:"red",marginTop:"15px"}}>
            {message}
        </div>
    )
}