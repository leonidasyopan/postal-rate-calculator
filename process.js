const process = (mailWeight, typeOfMail) => {
    let result = 0;
    let rate = 0;

    switch (typeOfMail) {
        case "letterStamped":
            rate = 0.55;
            break;
        case "letterMetered":
            rate = 0.50;       
            break;
        case "largeEnvelope":
            rate = 1.00;
            break;
        case "firstClassPackage":
            rate = 3.80;
            break;
        default:
            console.log("Error: No operator selected");
    }

    result = mailWeight * rate;

    console.log(result);
    return result;

}

exports.process = process;