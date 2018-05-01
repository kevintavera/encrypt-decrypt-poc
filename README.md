# Encrypt and Search Decrypt Data by Identifier
## Installation and Startup

yarn install
npm start

## Encrypt
POST http://localhost:8080/api/encrypt/ids/{your_id_here}
Payload: application/json
Body 
{
	"encryption_key" : "241923475951239b6f5dbb2828250",
	"value" : "this is my string value"
}
alternative to post objects:
{
	"encryption_key" : "241923475951239b6f5dbb2828250",
	"value" : {"firstName" : "Kevin", "lastName" : "Tavera"}
}

## Decrypt
GET http://localhost:8080/api/decrypt/ids/{your_id_here}?encryption_key=241923475951239b6f5dbb2828250
This endpoint returns all objects with a matching ID and encryption_key.
NOTE: for your_id_here param you can add a * to the end as a wild card character which will return all objects that wildcard match that have the same encryption key