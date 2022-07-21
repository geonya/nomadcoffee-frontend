import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import {
  useSearchCafesLazyQuery,
  useSearchCafesQuery,
} from '../generated/graphql';

interface SearchFormValues {
  keyword: string;
}

export default function Search() {
  const { register, handleSubmit, getValues } = useForm<SearchFormValues>({
    mode: 'onChange',
  });
  const [searchCafesFn, { data, loading }] = useSearchCafesLazyQuery();
  const onValid = ({ keyword }: SearchFormValues) => {
    searchCafesFn({
      variables: {
        keyword,
      },
    });
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          type='text'
          {...register('keyword', {
            required: { message: 'Please Write Something...', value: true },
            minLength: {
              message: 'Please enter more than 2 characters.',
              value: 2,
            },
          })}
        />
        <button>Find!</button>
      </form>
      {data?.searchCafes?.map((cafe) => (
        <div>
          <span>{cafe?.name}</span>
        </div>
      ))}
    </Layout>
  );
}
