# Hike Landing Page

Landing page built with HTML, SCSS and Vanilla JavaScript.

## Technologies

- HTML5
- SCSS
- JavaScript
- Vite

## how to add new image
-- name image without any spaces
-- name in english
-- copy the image to the folder src/assets/images
-- when you will add new {} - you need to write correct path
-- it will be `src/assets/images` + file name in ""
-- exampl `"./src/assets/images/gorgany_2.jpg"`

## how to add new hike
-- open hike-landing-page/public/data/hot-hikes.json

-- add new {} element
-- exmpl:
-- {
--   "image": "./src/assets/images/gorgany_2.jpg",
--   "title": "Похід на Горгани",
--   "date": "2026-09-18",
--   "location": "Карпати",
--   "duration": "2 дні",
--   "difficulty": "Складна",
--   "price": 2500,
--   "places": 5,
--   "description": "Дводенний похід мальовничими маршрутами Горган із ночівлею в горах."
-- }

-- note!! every field is required

## how to add hot-spot proposition
-- open hike-landing-page/public/data/hot-hikes.json

-- add new {} element
-- exmpl: 
-- {
--   "image": "./src/assets/images/gorgany_2.jpg",
--   "title": "Похід на Горгани",
--   "date": "2026-09-18",
--   "location": "Карпати",
--   "duration": "2 дні",
--   "difficulty": "Складна",
--   "price": 2500,
--   "discountPrice": 2000,
--   "places": 5,
--   "leftPlaces": 1,
--   "description": "Дводенний похід мальовничими маршрутами Горган із ночівлею в горах."
-- }

-- note!! you need to add new field `"discountPrice": 2000, ` with new price and `"leftPlaces": 1` with correct left places