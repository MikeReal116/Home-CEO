import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ListingFilter } from '../../lib/graphql/globalTypes';

interface Props {
  options: { name: string; value: string }[];
  option: string;
  setOption: React.Dispatch<React.SetStateAction<ListingFilter>>;
}

const useStyles = makeStyles((theme: Theme) => ({
  select: {
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '6px 10px',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  }
}));

const Select = ({ options, option, setOption }: Props) => {
  const classes = useStyles();

  const handleOptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOption(event.target.value as ListingFilter);
  };

  return (
    <NativeSelect
      value={option}
      onChange={handleOptionChange}
      id='filter-by-price'
      className={classes.select}
    >
      {options.map((optionValue) => (
        <option key={optionValue.name} value={optionValue.value}>
          {optionValue.name}
        </option>
      ))}
    </NativeSelect>
  );
};

export default Select;
