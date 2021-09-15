import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';

interface Props {
  name: string;
  label: string;
  multiline?: boolean;
  placeholder: string;
  maxRows?: number;
}

interface Config {
  [key: string]: any;
}

const TextFieldComponent = ({
  label,
  name,
  multiline = false,
  maxRows = 3,
  placeholder
}: Props) => {
  const [field, meta] = useField(name);

  const config: Config = {
    ...field,
    fullWidth: true,
    multiline,
    maxRows,
    label,
    placeholder,
    variant: 'outlined' as 'outlined'
  };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  return <TextField {...config} />;
};

export default TextFieldComponent;
