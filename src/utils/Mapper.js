export function mapPersonToConnections(person) {
    console.log(person);

    const special = new Set();
    const nodes = new Set();
    const links = new Set();

    const queue = [person];
    nodes.add({
        id: person.name,
        color: "red",
        size: 300,
    });
    special.add(person.name);

    while (queue.length > 0) {

        const person = queue.pop();
        if (!(special.has(person.name))) {
            nodes.add({id: person.name});
        }

        person["parents"].forEach(parent => {
            links.add({source: person.name, target: parent.name});
            queue.push(parent);
        });

        person["children"].forEach(child => {
            links.add({source: person.name, target: child.name});
            queue.push(child);
        });

    }

    console.log({
        nodes: Array.from(nodes),
        links: Array.from(links)
    });

    return {
        nodes: Array.from(nodes),
        links: Array.from(links)
    };

}