# Turkish Text-Classifier Application

<a href="#"><img src="https://img.shields.io/badge/Docker-Available-blue?logo=docker&style=for-the-badge" /></a>
<a href="#"><img src="https://img.shields.io/badge/React-v18.2.0-66c8d9?logo=react&style=for-the-badge" /></a>
<a href="#"><img src="https://img.shields.io/badge/FastAPI-v0.79.0-63a871?logo=fastapi&style=for-the-badge" /></a>
<a href="#"><img src="https://img.shields.io/badge/PyTorch-v1.12.0-red?logo=pytorch&style=for-the-badge" /></a>
<a href="#"><img src="https://img.shields.io/badge/MYSQL-v8.0.30-blue?logo=mysql&style=for-the-badge" /></a>


![plot](./images/tca.png)

Tuskish Text Classifier application to determine the topic of the input string. The model itself is a fine-tuned version of the BERT, Electra, DistilBERT.

# How to run the app?

- Clone the repository.
- Make sure you have docker and docker-compose in your environment.
- Navigate to the app folder.
- Run the following docker command.

```ruby
docker-compose up --build
```
- Wait until you see the initialization of the app.

```ruby
api_1 | INFO: Application startup complete.
```

- Navigate the following url in any web browser to reach the React app.

```ruby
http://localhost:3000/
```

# Quick tour on application

https://user-images.githubusercontent.com/78916039/185814942-8b1dec4b-4987-45a2-bc0f-3ef5d2cf20be.mp4

