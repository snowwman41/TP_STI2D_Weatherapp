@echo off
echo Demarrage du serveur sur http://localhost:8123
echo (Utilise bien http:// et non https://)
start "" http://localhost:8123
python -m http.server 8123
