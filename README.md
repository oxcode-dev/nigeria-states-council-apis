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