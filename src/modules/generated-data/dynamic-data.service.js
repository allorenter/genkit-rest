export const mobilePhone = () => {
  let mobile = '6';
  for (let i = 0; i < 8; i += 1) {
    mobile += `${Math.floor(Math.random() * 10 + 0)}`;
  }
  return mobile;
};

export const dni = () => {
  const controlLetters = 'TRWAGMYFPDXBNJZSQVHLCKEO';
  let dniNumbers = '';
  for (let i = 0; i < 8; i += 1) {
    dniNumbers += `${Math.floor(Math.random() * 10 + 0)}`;
  }
  return `${dniNumbers}${controlLetters.charAt(dniNumbers % 23)}`;
};

export const randomString = (stringLength = 8) => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let generatedString = '';
  for (let i = 0; i < stringLength; i += 1) {
    generatedString += characters.charAt(Math.round(Math.random() * (characters.length - 0) + 0));
  }
  return generatedString;
};

export const randomNumber = (min = 1, max = 10) => Math.round(Math.random() * (max - min) + min);

export const creditCard = (type = 'any') => {
  let part1 = '';
  switch (type) {
    case 'any':
      part1 = Math.round(Math.random() * (6000 - 4000) + 4000);
      break;
    case 'visa':
      part1 = Math.round(Math.random() * (5000 - 4000) + 4000);
      break;
    case 'mastercard':
      part1 = Math.round(Math.random() * (6000 - 5000) + 5000);
      break;
    default:
      part1 = Math.round(Math.random() * (6000 - 4000) + 4000);
      break;
  }
  const part2 = Math.round(Math.random() * (9999 - 1) + 1).toString().padStart(4, 0);
  const part3 = Math.round(Math.random() * (9999 - 1) + 1).toString().padStart(4, 0);
  const part4 = Math.round(Math.random() * (9999 - 1) + 1).toString().padStart(4, 0);
  return `${part1} ${part2} ${part3} ${part4}`;
};

export const matricula = () => {
  const letters = 'BCDFGHJKLMNOPQRSTVWXYZ';
  const matriculaNumber = Math.round(Math.random() * (9999 - 1) + 1).toString().padStart(4, 0);
  const part1 = letters.charAt(Math.round(Math.random() * (letters.length - 0) + 0));
  const part2 = letters.charAt(Math.round(Math.random() * (letters.length - 0) + 0));
  const part3 = letters.charAt(Math.round(Math.random() * (letters.length - 0) + 0));
  return matriculaNumber + part1 + part2 + part3;
};

export const boolean = () => Math.random() >= 0.5;

export const randomDate = (startDate = '2000-1-1', endDate = '2021-1-1') => {
  const formatedStartDate = new Date(startDate);
  const formatedEndDate = new Date(endDate);
  return new Date(formatedStartDate.getTime() + Math.random() * (formatedEndDate.getTime() - formatedStartDate.getTime()))
    .toLocaleDateString();
};

export const carBrand = () => {
  const brands = ['Citroën', 'Alfa Romeo', 'Ferrari', 'Studebaker', 'Jensen', 'Eagle', 'Hummer', 'Maserati', 'Lotus',
    'Rolls-Royce', 'Kia', 'MINI', 'Panoz', 'Scion', 'Bentley', 'Acura', 'Jeep', 'Maybach', 'Hyundai', 'Subaru', 'Jaguar',
    'Lamborghini', 'Saturn', 'Volkswagen', 'Daewoo', 'Toyota', 'Lexus', 'Honda', 'Geo', 'Aston Martin', 'Chrysler', 'Mercury',
    'Dodge', 'BMW', 'Mitsubishi', 'Porsche', 'Mazda', 'Isuzu', 'Plymouth', 'Saab', 'Pontiac', 'Chevrolet', 'Land Rover',
    'Lincoln', 'Infiniti', 'Ford', 'Audi', 'Volvo', 'Suzuki', 'Cadillac', 'Mercedes-Benz', 'Nissan',
  ];
  return brands[Math.round(Math.random() * (brands.length - 0) + 0)];
};

export const generatePropertyValue = (propertyName) => {
  const map = {
    mobilePhone: mobilePhone(),
    dni: dni(),
    randomString: randomString(),
    randomNumber: randomNumber(),
    creditCard: creditCard(),
    matricula: matricula(),
    boolean: boolean(),
    randomDate: randomDate(),
    carBrand: carBrand(),
  };
  return map[propertyName];
};
