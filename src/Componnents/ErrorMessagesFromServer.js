export default function errorMessagesFromServer(props){

    let codeNumber = props.message;
    let message = "";

    switch (codeNumber){

        case 1000:
            message = "username is required";
            break;

        case 1001:
            message = "password is required";
            break;

        case 1002:
            message = "username must contains 6 character at least";
            break;

        case 1003:
            message = "username must contains any letter";
            break;

        case 1004:
            message = "password must contains 8 characters at least";
            break;

        case 1005:
            message = "password must contains capital letter";
            break;

        case 1006:
            message = "password must contains lower letter";
            break;

        case 1007:
            message = "password must contains digit";
            break;

        case 1008:
            message = "Error: this username is already exist";
            break;

        case 1009:
            message = "Error: wrong username or password";
            break;

        case 1010:
            message = "ERROR: NO SUCH TOKEN";
            break;

        case 1011:
            message = "home team doesnt exist";
            break;

        case 1012:
            message = "away team doesnt exist";
            break;

        case 1013:
            message = "home team already in live";
            break;

        case 1014:
            message = "away team already in live";
            break;

        case 1015:
            message = "you can not choosing two identical teams";
            break;

        case 1016:
            message = "this game not in live";
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