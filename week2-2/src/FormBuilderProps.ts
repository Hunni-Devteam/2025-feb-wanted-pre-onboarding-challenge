import { FormProps } from "./FormBuilder";

const FormBuilderProps: FormProps[] = [
  {
    type: 'input',
    props: {
      placeholder: 'Full Name',
      label: 'Full Name',
      value: '',
      onChange: (e) => console.log(e.target.value),
      htmlType: 'text',
    },
  },
  {
    type: 'input',
    props: {
      placeholder: 'Email',
      label: 'Email',
      value: '',
      onChange: (e) => console.log(e.target.value),
      htmlType: 'email',
    },
  },
  {
    type: 'input',
    props: {
      placeholder: 'Password',
      label: 'Password',
      value: '',
      onChange: (e) => console.log(e.target.value),
      htmlType: 'password',
    },
  },
  {
    type: 'input',
    props: {
      placeholder: 'Confirm Password',
      label: 'Confirm Password',
      value: '',
      onChange: (e) => console.log(e.target.value),
      htmlType: 'password',
    },
  },
  {
    type: 'select',
    props: {
      placeholder: 'Select User',
      label: 'Select User',
      value: '',
      onChange: (e) => console.log(e.target.value),
      options: [
        { value: '1', label: 'User 1' },
        { value: '2', label: 'User 2' },
        { value: '3', label: 'User 3' },
      ],
    },
  },
]

export default FormBuilderProps;