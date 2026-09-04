# **Hike Landing Page**

Landing page built with HTML, SCSS and Vanilla JavaScript.

## **Technologies**

* HTML5
* SCSS
* JavaScript
* Vite

## **How to Add New Image**

* Name the image without any spaces.
* Use an English name.
* Copy the image to the `src/assets/images` folder.
* When adding a new `{}` element, make sure to use the correct image path.
* The path is `src/assets/images` + the file name in `""`.
* Example: `"./src/assets/images/gorgany_2.jpg"`

## **How to Add New Hike**

* Open `hike-landing-page/public/data/hot-hikes.json`.
* Add a new `{}` element.
* Example:

```json
{
  "image": "./src/assets/images/gorgany_2.jpg",
  "title": "Похід на Горгани",
  "date": "2026-09-18",
  "location": "Карпати",
  "duration": "2 дні",
  "difficulty": "Складна",
  "price": 2500,
  "places": 5,
  "description": "Дводенний похід мальовничими маршрутами Горган із ночівлею в горах."
}
```

**Note:** Every field is required.

## **How to Add Hot-Spot Proposition**

* Open `hike-landing-page/public/data/hot-hikes.json`.
* Add a new `{}` element.
* Example:

```json
{
  "image": "./src/assets/images/gorgany_2.jpg",
  "title": "Похід на Горгани",
  "date": "2026-09-18",
  "location": "Карпати",
  "duration": "2 дні",
  "difficulty": "Складна",
  "price": 2500,
  "discountPrice": 2000,
  "places": 5,
  "leftPlaces": 1,
  "description": "Дводенний похід мальовничими маршрутами Горган із ночівлею в горах."
}
```

**Note:** You need to add the new field `"discountPrice": 2000` with the new price and `"leftPlaces": 1` with the correct number of remaining places.


## **How to Add New Question and Answer**

* Open `hike-landing-page/public/data/faq.json`.
* Add a new `{}` element.
* Example:

```json
{
  "question": "Чи надаєте ви спорядження в оренду?",
  "answer": "Ні, я не надаю спорядження в оренду. Але перед походом консультую щодо необхідного спорядження та допомагаю підібрати те, що вам підійде для конкретного маршруту."
}
```

**Note:** Both `question` and `answer` fields are required.
