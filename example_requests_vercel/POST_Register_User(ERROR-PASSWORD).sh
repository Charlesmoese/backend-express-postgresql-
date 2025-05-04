curl --request POST \
  --url 'https://express-backend-teste.vercel.app/users/register' \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "newuser",
    "email":"newuser@example.com",
    "password": "securepassword"
    }'