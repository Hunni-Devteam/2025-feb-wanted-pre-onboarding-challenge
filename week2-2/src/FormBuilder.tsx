interface BaseFormProps {
  type: string;
  props: Record<string, unknown>;
}

interface InputProps extends BaseFormProps {
  type: 'input';
  props: {
    placeholder?: string;
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    htmlType?: 'text' | 'password' | 'email';
  };
}

interface SelectProps extends BaseFormProps {
  type: 'select';
  props: {
    placeholder?: string;
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string, label: string }[];
  };
}

export type FormProps = InputProps | SelectProps; 

export const FormBuilder = ({
  type,
  props,
}: FormProps) => {
  switch (type) {
    case 'input':
      return (
        <input
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          type={props.htmlType}
        />
      );
    case 'select':
      return (
        <select
          value={props.value}
          onChange={props.onChange}
        >
          <option value="">{props.placeholder}</option>
          {props.options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      );
    default:
      return null;
  }
}