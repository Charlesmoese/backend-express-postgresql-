# URL do endpoint
URL="https://express-backend-teste.vercel.app/register"

# Lista de usuários para registrar
USERS=(
  '{"username": "user1", "email": "user1@example.com", "password": "Password123"}'
  '{"username": "user2", "email": "user2@example.com", "password": "Password123"}'
  '{"username": "user3", "email": "user3@example.com", "password": "Password123"}'
  '{"username": "user4", "email": "user4@example.com", "password": "Password123"}'
  '{"username": "user5", "email": "user5@example.com", "password": "Password123"}'
)

# Loop para registrar cada usuário
for USER in "${USERS[@]}"; do
  echo "Registrando usuário: $USER"
  curl --request POST \
    --url "$URL" \
    --header "Content-Type: application/json" \
    --data "$USER"
  echo -e "\n"
done