import axios from "./axios";

export function getPeople() {
    return axios.get("/person/all")
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return []
        });
}

export function getPerson(countryCode, idCode) {
    return axios.get("/person/" + countryCode + "/" + idCode)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            return {}
        });
}

export async function postPerson(person) {
    return await axios.post("/person", person)
        .then(res => {
            return res;
        })
        .catch(error => {
            throw error
        });
}


export function putPerson(person) {
    return axios.put("/person", person)
        .then(res => {
            return res;
        })
        .catch(error => {
            throw error
        });
}


export function deletePerson(countryCode, idCode) {
    return axios.delete("/person/" + countryCode + "/" + idCode)
        .then(res => {
            return res;
        })
        .catch(error => {
            throw error
        });
}
