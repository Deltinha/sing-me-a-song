## Sing Me a Song

This is an application where you can post and get music recommendations. It has a scoring system so you can vote for your favorite songs.

### Technologies

- NodeJS
- ExpressJS
- nodemon
- pg
- dotenv
- cors
- Jest
- prettier
- eslint

### Running locally

1. Clone this repo

```sh
git clone https://github.com/Deltinha/sing-me-a-song.git
```

2. Install dependencies

```sh
npm install
```

3. Navigate to the repository folder and run the following commands to create a database

```ssh
sudo -u postgres createdb -T template0 sing_me_a_song

sudo -u postgres psql sing_me_a_song < 'dump.sql'
```

3. Create a new file called `.env` in the root folder using `.env-example` as template. Feed the newly created file with the info of your database.
4. To run in development mode

```sh
npm run dev
```

### Documentation

**POST** `/recommendations`

You can insert a recommendation by using this endpoint. The body contents should be a JSON object following the example below.

```json
{
  "name": "Maroon 5 - Memories",
  "youtubeLink": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**POST** `/recommendations/:id/upvote`

You can increase a recommendation's score using this endpoint.

**POST** `/recommendations/:id/downvote`

You can decrease a recommendation's score using this endpoint.

**GET** `/recommendations/random`

You can get a single random recommendation by using this endpoint.

```json
{
	"id": 15,
	"name": "Olivia Rodrigo - good 4 u",
	"youtubeLink": "https://www.youtube.com/watch?v=Yb6dZ1IFlKc",
	"score": 25
}
```

**GET** `/recommendations/top/:amount`

You can get the top recommendations by using this endpoint.

```jso
[
	{
		"id": 10,
		"name": "Maroon 5 - Memories",
  		"youtubeLink": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
		"score": 32
	},
	{
		"id": 15,
		"name": "Olivia Rodrigo - good 4 u",
		"youtubeLink": "https://www.youtube.com/watch?v=Yb6dZ1IFlKc",
		"score": 25
	},
	...
]
```
