curl --request POST \
  --url 'https://backend-express-postgresql-ten.vercel.app/users/register' \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "newuser",
    "password": "securepassword123"
    }'