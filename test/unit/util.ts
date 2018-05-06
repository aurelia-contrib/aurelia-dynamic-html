export function getAllProperties<T extends object>(obj: T): { key: keyof T; value: T[keyof T] }[] {
  return (getAllPropertyNames(obj) as (keyof T)[]).map(key => ({ key, value: obj[key] }));
}

export function getAllPropertyNames(obj: any): string[] {
  const allNames = ["__metadata__"];
  let proto = obj;
  for (; proto !== Object.prototype; proto = Object.getPrototypeOf(proto)) {
    const ownNames = Object.getOwnPropertyNames(proto);
    const length = ownNames.length;
    for (let i = 0; i < length; i++) {
      const propertyName = ownNames[i];
      if (allNames.indexOf(propertyName) === -1) {
        allNames.push(propertyName);
      }
    }
  }

  return allNames.slice(1);
}
