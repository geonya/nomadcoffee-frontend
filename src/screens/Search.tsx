import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import SubmitButton from '../components/buttons/SubmitButton';
import CafesPhotoGridContainer from '../components/CafesPhotoGridContainer';
import { Input } from '../components/Input';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { useSearchCafesLazyQuery } from '../generated/graphql';

interface SearchFormValues {
  keyword: string;
}

export default function Search() {
  const { register, handleSubmit } = useForm<SearchFormValues>({
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
      <Form onSubmit={handleSubmit(onValid)}>
        <SearchInputBox>
          <Input
            type='text'
            {...register('keyword', {
              required: { message: 'Please Write Something...', value: true },
              minLength: {
                message: 'Please enter more than 2 characters.',
                value: 2,
              },
            })}
          />
          <SubmitButton type='submit' value='Find' />
        </SearchInputBox>
      </Form>
      {!data || !data.searchCafes ? (
        <EmptyContainer>
          <span>Search Anything...</span>
        </EmptyContainer>
      ) : !loading ? (
        <CafesPhotoGridContainer cafes={data.searchCafes} />
      ) : (
        <Loading />
      )}
    </Layout>
  );
}

const SearchInputBox = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 5fr 1fr;
`;

const Form = styled.form`
  width: 80%;
  right: 0;
  left: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
