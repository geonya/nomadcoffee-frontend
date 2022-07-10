import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { createCategoryObj } from '../components/sharedFunc';
import {
  useDeleteCafeMutation,
  useEditCafeMutation,
  useSeeCafeQuery,
} from '../generated/graphql';
import { routes } from '../sharedData';
import { useSeeMyProfile } from '../utils';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CafeForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    padding: 5px;
    border: 1px solid ${(props) => props.theme.borderColor};
  }
`;
const CategoryListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.borderColor};
`;
const CategoryList = styled.div`
  display: flex;
`;
const CategoryItem = styled.span<{ picked: boolean }>`
  margin: 0 5px;
  cursor: pointer;
  padding: 3px;
  background-color: ${(props) => (props.picked ? 'blue' : '')};
  color: ${(props) => (props.picked ? 'white' : '')};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
`;
const CategoryAddButton = styled.div`
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 5px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
`;
const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
`;
const CategoryAddModal = styled.div`
  position: absolute;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: white;
  width: 200px;
  height: 100px;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
      font-size: 18px;
      padding: 10px;
      text-align: center;
    }
  }
`;
const CategoryTitle = styled.div`
  padding: 10px 0;
  font-size: 15px;
`;
interface EditFormValues {
  name: string;
  latitude: string;
  longitude: string;
  files: FileList;
  result: string;
}

interface CategoryAddFormValues {
  name: string;
}
export default function Cafe() {
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [pickCategories, setPickCategories] = useState<string[]>([]);
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const navigation = useNavigate();
  const [isMe, setIsMe] = useState(false);
  const { id: cafeId } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<EditFormValues>({ mode: 'onChange' });
  const { register: categoryRegister, handleSubmit: categoryHandleSubmit } =
    useForm<CategoryAddFormValues>();
  const onCategorySubmitValid: SubmitHandler<CategoryAddFormValues> = (
    data
  ) => {
    setCategoryList((prev) => [...prev, data.name]);
    setAddCategoryModal(false);
  };
  const { data, loading } = useSeeCafeQuery({
    variables: { cafeId: +cafeId! },
    onCompleted: (data) => {
      if (!data.seeCafe) return;
      data.seeCafe?.categories?.forEach((category) => {
        if (!category) return;
        if (!categoryList.includes(category.name)) {
          setCategoryList((prev) => [...prev, category.name]);
          setPickCategories((prev) => [...prev, category.name]);
        }
      });
    },
  });
  const { data: meData } = useSeeMyProfile();
  const [editCafe, { loading: editLoading }] = useEditCafeMutation({
    onCompleted: (data) => {
      if (!data.editCafe) return;
      const {
        editCafe: { ok, error },
      } = data;
      if (!ok) {
        setError('result', { message: error! });
      }
    },
    update: (cache, result) => {
      if (!result.data?.editCafe.ok) return;
      const categories = pickCategories.map((name) => createCategoryObj(name));
      cache.modify({
        id: `Cafe:${cafeId}`,
        fields: {
          name: () => getValues().name,
          latitude: () => getValues().latitude,
          longitude: () => getValues().longitude,
          files: () => getValues().files,
          categories: (prev) => [...categories],
        },
      });
    },
  });
  const onSubmitValid: SubmitHandler<EditFormValues> = (data) => {
    if (loading) return;
    const categories = pickCategories.map((name) => createCategoryObj(name));
    editCafe({
      variables: {
        cafeId: +cafeId!,
        categories,
        ...data,
      },
    });
  };
  const [deleteCafe, { loading: deleteLoading }] = useDeleteCafeMutation({
    onCompleted: (data) => {
      if (!data.deleteCafe) return;
      const {
        deleteCafe: { ok, error },
      } = data;
      if (!ok) {
        setError('result', { message: error! });
      }
    },
    update: (cache, result) => {
      if (!result.data?.deleteCafe?.ok) return;
      cache.modify({
        id: 'ROOT_QUERY',
        fields: {
          seeCafes: (_, { DELETE }) => DELETE,
        },
      });
      navigation(routes.home);
    },
  });
  useEffect(() => {
    if (data?.seeCafe?.name) setValue('name', data?.seeCafe?.name);
    if (data?.seeCafe?.longitude)
      setValue('longitude', data?.seeCafe?.longitude);
    if (data?.seeCafe?.latitude) setValue('latitude', data?.seeCafe?.latitude);
  }, [data, setValue]);
  useEffect(() => {
    setIsMe(data?.seeCafe?.user.username === meData?.seeMyProfile?.username);
  }, [data, meData]);
  useEffect(() => {
    let map = null;
    const initMap = () => {
      const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37, 127),
        zoom: 13,
      });
    };
    initMap();
  }, []);
  return (
    <Layout>
      <Wrapper>
        <div id='map' style={{ width: '200px', height: '200px' }}></div>
        {loading ? (
          'loading...'
        ) : (
          <>
            {data?.seeCafe?.photos ? (
              <img
                src={data?.seeCafe?.photos[0]?.url}
                alt={data?.seeCafe?.name}
                width={300}
                height={300}
              />
            ) : null}
            <CafeForm onSubmit={handleSubmit(onSubmitValid)}>
              <input
                type='file'
                accept='image/*'
                {...register('files')}
                multiple
                disabled={!isMe}
              />
              <span>Photo</span>
              <input
                type='text'
                placeholder='Name'
                {...register('name', { required: true })}
                disabled={!isMe}
              />
              <input
                type='text'
                placeholder='latitude'
                {...register('latitude', { required: true })}
                disabled={!isMe}
              />
              <input
                type='text'
                placeholder='longitude'
                {...register('longitude', { required: true })}
                disabled={!isMe}
              />

              <CategoryListBox>
                <CategoryTitle>
                  <span>Categories</span>
                </CategoryTitle>
                <CategoryList>
                  {categoryList.map((name, i) => (
                    <CategoryItem
                      key={i}
                      onClick={() =>
                        setPickCategories((prev) =>
                          !pickCategories.includes(name)
                            ? [...prev, name]
                            : [...prev.filter((item) => item !== name!)]
                        )
                      }
                      picked={pickCategories.includes(name)}
                    >
                      {name}
                    </CategoryItem>
                  ))}
                </CategoryList>
                <CategoryAddButton onClick={() => setAddCategoryModal(true)}>
                  ADD
                </CategoryAddButton>
              </CategoryListBox>
              {isMe ? (
                <button>{editLoading ? 'Loading...' : 'Edit Cafe'}</button>
              ) : null}
              <span>{errors.result?.message}</span>
            </CafeForm>
            {isMe ? (
              <button
                onClick={() =>
                  deleteCafe({
                    variables: { cafeId: +cafeId! },
                  })
                }
              >
                {deleteLoading ? 'Loading...' : 'Delete Cafe'}
              </button>
            ) : null}
          </>
        )}
        {addCategoryModal ? (
          <>
            <ModalBackground onClick={() => setAddCategoryModal(false)} />
            <CategoryAddModal>
              <form onSubmit={categoryHandleSubmit(onCategorySubmitValid)}>
                <input
                  {...categoryRegister('name', { required: true })}
                  type='text'
                  placeholder='name'
                />
                <input type='submit' value='Add' />
              </form>
            </CategoryAddModal>
          </>
        ) : null}
      </Wrapper>
    </Layout>
  );
}
