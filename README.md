# 🇳🇬 Nigeria States and Local Government API built with NodeJS, ExpressJS and MongoDB

A simple and fast REST API providing all **Nigeria states, the Federal Capital Territory (FCT), and Local Government Areas (LGAs)**.  
Built with scalability, developer experience, and real-world usage in mind.

---

## 🚀 How to Use

# Get All States

GET ```/api/states```

``` Response
{
    "data": [
        {
            "_id": "697d57d86bb5383b07fca60d",
            "name": "Abia",
            "code": "AB",
            "slogan": "God's Own State",
            "__v": 0,
            "capital_city": "Umuahia",
            "creation_year": 1991,
            "description": "Nulla harum beatae n",
            "geo_zone": "South East"
        },
    ...],
    "metadata": {
        "totalCount": 4
    }
}
```

# Get State By ID

GET ```/api/states/{id}```

``` Response
{
    "_id": "697d57d86bb5383b07fca60d",
    "name": "Abia",
    "code": "AB",
    "slogan": "God's Own State",
    "__v": 0,
    "capital_city": "Umuahia",
    "creation_year": 1991,
    "description": "Nulla harum beatae n",
    "geo_zone": "South East"
}
```

# Get All States With LGAs

GET ```/api/states-with-lgas```

``` Response
{
    "data": [
        {
            "_id": "697d57d86bb5383b07fca60d",
            "name": "Abia",
            "code": "AB",
            "slogan": "God's Own State",
            "__v": 0,
            "capital_city": "Umuahia",
            "creation_year": 1991,
            "description": "Nulla harum beatae n",
            "geo_zone": "South East"
            "lgas": [
                {
                    "_id": "6985f4251d00bd7a3fa15bfc",
                    "name": "Marcia Perkins",
                    "description": "Placeat pariatur N",
                    "code": "Ut exercitation quas",
                    "slogan": "Necessitatibus volup",
                    "capital_town": "Quos provident ut e",
                    "state_id": "698378bf23b225abd6efa970",
                    "creation_year": 2007,
                    "state": "698378bf23b225abd6efa970",
                    "__v": 0
                },
                ...
            ]
        },
        ...
    ],
    "metadata": {
        "totalCount": 4
    }
}
```
# Get Local Government by state

GET ```/api/states/:state/lgas```

``` Response
{
    "status": "success",
    "lgas": [
        {
            "_id": "697d57d86bb5383b07fca60d",
            "name": "Abia",
            "code": "AB",
            "slogan": "God's Own State",
            "__v": 0,
            "capital_town": "Umuahia",
            "creation_year": 1991,
            "description": "Nulla harum beatae n",
            "state_id": "697d57d86bb5383b07fca60d",
        },
        ...
    ],
    "state": {
        "name": "Lucas Osborn",
        "code": "Maxime harum distinc",
        "id": "697d57d86bb5383b07fca60d"
    },
}
```

---

## 📌 Use Cases

- ✅ Election & civic apps
- ✅ Forms (state/LGA dropdowns)
- ✅ Data (Address) validation for forms
- ✅ Location-based services in Nigeria
- ✅ Government, fintech, health, education, & NGO apps

---

## 🚀 Features

- ✅ List all Nigerian states and some details about them
- ✅ List all Nigerian Local Governments and some details about them
- ✅ Get LGAs by state
- ✅ Includes FCT (Abuja)
- ✅ Lightweight & fast
- ✅ JSON responses
- ✅ Easy to integrate

---

## 🧱 Tech Stack

- ✅ Node.js
- ✅ Express.js
- ✅ MongoDB
- ✅ REST architecture

---

## 📜 License

**MIT** – free to use, modify, and distribute.  
Attribution is appreciated but not required.

---

## 🙌 Contributions

Found an error or want to add metadata (region, postal codes, coordinates)?  
PRs welcome!