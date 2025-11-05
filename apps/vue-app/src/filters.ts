const filter = props => [
  {
    fieldType: 'field',
    group: [
      {
        field: 'select',
        name: 'country',
        label: 'Country',
        placeholder: 'Select Country',
        options: props.countryOptions || [],
      },
      {
        field: 'select',
        name: 'state',
        label: 'State/Province',
        placeholder: 'Select State/Province',
        dependsOn: 'country',
        options: [],
        clearable: true,
      },
    ],
  },
];

export default filter;
