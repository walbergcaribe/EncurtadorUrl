const { default: axios } = require("axios");

exports.getById = async (id) => {
    const { data } = await axios.get(`http://localhost:3000/api/urls/${id}`);

    console.log(data);

    if (data && !data.url_encurtada) {
        data.url_encurtada = 0;
    }

    return data || 0;
};
