export const genderConstants = ['male', 'female'];
export const bloodGroupConstants = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];

export const studentSearchableFields = [
  'id',
  'name.firstName',
  'name.middleName',
  'name.lastName',
  'email',
  'contactNumber',
  'bloodGroup',
  'presentAddress',
  'guardian.fatherName',
  'guardian.motherName',
  'guardian.address',
  'localGuardian.name',
  'localGuardian.address',
];

export const studentFilterableFields = [
  'searchTerm',
  'id',

  'email',
  'contactNumber',
  'bloodGroup',
];
