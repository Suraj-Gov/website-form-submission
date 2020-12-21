function getFormData(form) {
  const elements = form.elements;
  const fields = Object.keys(elements)
    .map((i) => {
      return elements[i].name !== undefined && elements[i].name;
    })
    .filter((i, pos, arr) => arr.indexOf(i) === pos && i);
  console.log(fields);
  const formData = {};
  fields.forEach((name) => {
    const el = elements[name];
    formData[name] = el.value;
  });
  return formData;
}

function encodeData(formData) {
  return Object.keys(formData)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(formData[k]))
    .join("&");
}

async function detect(e) {
  console.log(e);
  e.preventDefault();
  const form = e.target;
  const formData = getFormData(form);
  const url =
    "https://script.google.com/macros/s/AKfycbz-8thyoOjpH3OjdUF-Y6M2v5K5vAfejZmmX37iSb3jg9WauC5k40_VkQ/exec";
  try {
    const result = await fetch(url, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encodeData(formData),
    });
    result.status === 0 && alert("SUCCESS");
  } catch (error) {
    alert("SOMETHING WENT WRONG!");
    console.log(error);
  }
}

// excel sheet here: https://docs.google.com/spreadsheets/d/16zPJ4cXraN36IhKipOnWjGHh5AwEI9gVQSzp_xMl52Y/edit#gid=0
