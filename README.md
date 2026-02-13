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
["Abia", "Adamawa", "Akwa Ibom", ..., "Zamfara"]
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

Host the files on:
- GitHub Pages
- Netlify / Vercel
- Local or cloud-based APIs

Then fetch like:
```js
fetch("/data/full.json").then(res => res.json());
```

---

## 📌 Use Cases

- ✅ Election & civic apps
- ✅ State/LGA/Ward dropdowns
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