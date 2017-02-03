//importing modules
var express = require( 'express' );
var request = require( 'request' );
var cheerio = require( 'cheerio' );

//creating a new express server
var app = express();

//setting EJS as the templating engine
app.set( 'view engine', 'ejs' );

//setting the 'assets' directory as our static assets dir (css, js, img, etc...)
app.use( '/assets', express.static( 'assets' ) );


//makes the server respond to the '/' route and serving the 'home.ejs' template in the 'views' directory
app.get( '/', function ( req, res ) {
    res.render( 'home', {
        message: 'The Home Page!'
    });
});


//launch the server on the 4000 port
app.listen( 4000, function () {
    console.log( 'App listening on port 4000!' );
});

function lbc() {

    var url = 'https://www.leboncoin.fr/ventes_immobilieres/1087631966.htm?ca=12_s'

    request( url, function ( error, response, html ) {
        if ( !error && response.statusCode == 200 ) {

            const $ = cheerio.load( html )

            const lbcDataArray = $( 'section.properties span.value' )

            let lbsData = {
                price: parseInt( $( lbcDataArray.get( 0 ) ).text().replace( /\s/g, '' ), 10 ),
                city: $( lbcDataArray.get( 1 ) ).text().trim().toLowerCase().replace( /\s/g, '-' ),
                type: $( lbcDataArray.get( 2 ) ).text().trim().toLowerCase(),
                surface: parseInt( $( lbcDataArray.get( 4 ) ).text().replace( /\s/g, '' ), 10 ),
            }
            console.log( lbcData )
        }
        else {
            console.log( error )
        }
    })
}


app.get( '/', function ( req, res ) {

    var url = 'req.query.urlLBC' // html page url

    
    lbc();

    res.render( 'home', {
        message: 'The Home Page!'
    });



    //4000 port
    app.listen( 4000, function () {
        console.log( 'App listening on port 4000!' );
    });


})