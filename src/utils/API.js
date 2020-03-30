import axios from "./axios";

export function getPeople() {
    return axios.get("/person/all")
        .then(res => {
            return res.data;
        });
}

export function getPerson(countryCode, idCode) {
    return axios.get("/person/" + countryCode + "/" + idCode)
        .then(res => {
            return res.data;
        });
}

export function getYoungestUncleThingy() {
    return axios.get("/person/youngest/auntOrUncle")
        .then(res => {
            return res.data;
        });
}

export function getPersonTree(countryCode, idCode) {
    return axios.get("/person/tree/" + countryCode + "/" + idCode)
        .then(res => {
            return res.data;
        });
}

export async function postPerson(person) {
    return await axios.post("/person", person)
        .then(res => {
            return res;
        });
}


export function putPerson(countryCode, idCode, person) {
    return axios.put("/person/" + countryCode + "/" + idCode, person)
        .then(res => {
            return res;
        });
}


export function deletePerson(countryCode, idCode) {
    return axios.delete("/person/" + countryCode + "/" + idCode)
        .then(res => {
            return res;
        });
}

export function personPosition(countryCode, idCode) {
    return axios.get("/person/position/" + countryCode + "/" + idCode)
        .then(res => {
            return res.data;
        });
}