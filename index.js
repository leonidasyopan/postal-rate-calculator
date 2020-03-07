const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const logic = require('./process.js')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('public/javascript', path.join(__dirname, "public/javascript"))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/home'))
  .get('/process', (req, res) => {

    let mailWeight = Number(req.query.mailWeight);
    let typeOfMail = req.query.typeOfMail;
    let result = logic.process(mailWeight, typeOfMail);
    let readableType = "";

    switch (typeOfMail) {
      case "letterStamped":
          readableType = "Letters (Stamped)";
          break;
      case "letterMetered":
          readableType = "Letters (Metered)";       
          break;
      case "largeEnvelope":
          readableType = "Large Envelopes (Flats)";
          break;
      case "firstClassPackage":
          readableType = "First-Class Package Service—Retail";
          break;
      default:
          console.log("Error: No operator selected");
  }

    res.redirect('results?value=' + result + '&mailWeight=' + mailWeight + '&readableType=' + readableType)
  })

  .get('/results', (req, res) => {
    res.render('pages/results', {result: req.query.value, mailWeight: req.query.mailWeight, readableType: req.query.readableType})
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
