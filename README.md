# 🇳🇬 Nigeria States and Local Government API built with NodeJS, ExpressJS and MongoDB

A comprehensive, structured, and ready-to-use api urls of all **States**, and **Local Government Areas (LGAs)** in Nigeria.
 <!-- including their **geographic coordinates**. -->

Ideal for developers, civic tech, GIS, mapping tools, and data-driven apps.

---

<!-- ## 📁 Folder: `data/` -->

| URLs | Description |
|------|-------------|
| `api/public/states` | List of all Nigerian states (36 + FCT) |
| `api/public/lgas` | List of all Nigerian LGAs (768 + 6 in FCT)  |
<!-- | `wards.json` | Flat list of all wards with their lat/long | -->
<!-- | `lgas-with-wards.json` | Nested object: state → LGA → wards | -->
<!-- | `full.json` | 🔥 All-in-one structure: state → LGA → wards with coordinates | -->

---

## 🔎 File Structure Examples

### `states.json`
```json
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

### `lgas.json`
```json
{
  "Kwara": ["Ilorin East", "Ilorin South", "Ilorin West", ...],
  ...
}
```

---

## 🚀 How to Use

fetch like:
```js
fetch("/data/full.json").then(res => res.json());
```

---

## 📌 Use Cases

- ✅ Election & civic apps
- ✅ State/LGA dropdowns
- ✅ Offline mapping and analytics
- ✅ Data validation for forms
- ✅ Location-based services in Nigeria

---

## 📜 License

**MIT** – free to use, modify, and distribute.  
Attribution is appreciated but not required.

---

## 🙌 Contributions

Found an error or want to add metadata (region, postal codes, coordinates)?  
PRs welcome!