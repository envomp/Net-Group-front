import axios from "./axios";

export async function getPeople() {
    return await axios.get("/person/all")
        .then(res => {
            const people = [];
            for (let i = 0; i < res.data.length; i++) {
                people.push(res.data[i])
            }
            return people;
        })
        .catch(error => {
            return []
        });
}

export async function getPerson(countryCode, idCode) {
    return await axios.get("/person/" + countryCode + "/" + idCode)
        .then(res => {
            return res;
        })
        .catch(error => {
            return null
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


export async function putPerson(person) {
    return await axios.put("/person", person)
        .then(res => {
            return res;
        })
        .catch(error => {
            throw error
        });
}


export function deletePerson(countryCode, idCode) {
    axios.delete("/person/" + countryCode + "/" + idCode)
        .then(res => {
            return res;
        })
        .catch(error => {
            throw error
        });
}
