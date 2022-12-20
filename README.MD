# 1 key https
openssl genrsa -out key.pem 
penssl req -new -key key.pem -out csr.pem
penssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem