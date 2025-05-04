curl --request POST \
  --url 'https://express-backend-teste.vercel.app/users/register' \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "newuser2",
    "email":"newuser@example2.com",
    "password": "securepassword123"
    }'