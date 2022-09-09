async function fieldPopulator(detailedFields, records, entityName) {
    return new Promise((resolve, reject) => {
        try {
            records.forEach(function (record) {
                let ID = record.id;
                let idName = `${entityName}Id`;

                let fields = Object.keys(record["fields"]);
                let newObject = {};
                newObject[idName] = ID;

                fields.forEach((item) => {
                    let prop = item.toLowerCase();
                    newObject[prop] = typeof record.get(item) === "undefined" ? "" : record.get(item);
                });

                detailedFields.push(newObject);
            });
            resolve(detailedFields);
        } catch {
            reject("something went wrong");
        }
    });
}

module.exports = fieldPopulator;
