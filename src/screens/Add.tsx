import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SubmitButton from '../components/buttons/SubmitButton';
import { Input } from '../components/Input';
import Layout from '../components/Layout';
import { createCategoryObj } from '../components/sharedFunc';
import {
  useCreateCafeMutation,
  useSeeCategoriesQuery,
} from '../generated/graphql';
import { routes } from '../sharedData';
import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface AddFormValues {
  name: string;
  latitude: string;
  longitude: string;
  files: FileList;
  result: string;
}
interface CategoryAddFormValues {
  name: string;
}

const Add = () => {
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [pickCategories, setPickCategories] = useState<string[]>([]);
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [photosPreview, setPhotosPreview] = useState<string[]>([]);
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<AddFormValues>();
  const filesWatch = watch('files');
  const {
    register: categoryRegister,
    handleSubmit: categoryHandleSubmit,
    setValue: categorySetValue,
  } = useForm<CategoryAddFormValues>();

  const onCategorySubmitValid: SubmitHandler<CategoryAddFormValues> = (
    data
  ) => {
    if (!categoryList.includes(data.name)) {
      setCategoryList((prev) => [...prev, data.name]);
      setPickCategories((prev) => [...prev, data.name]);
    } else {
      setPickCategories((prev) => [...prev, data.name]);
    }
    categorySetValue('name', '');
    setAddCategoryModal(false);
  };
  const [createCafe, { loading }] = useCreateCafeMutation({
    onCompleted: (data) => {
      if (!data.createCafe) return;
      const {
        createCafe: { ok, error },
      } = data;
      if (!ok) {
        setError('result', { message: error! });
        return;
      }
    },
    update: (cache, result) => {
      if (!result.data?.createCafe.cafe) return;
      const {
        data: {
          createCafe: { cafe },
        },
      } = result;
      if (cafe?.id) {
        cache.modify({
          id: `ROOT_QUERY`,
          fields: {
            seeCafes: (prev) => [cafe, ...prev],
          },
        });
      }
      navigation(routes.home);
    },
  });
  const onSubmitValid: SubmitHandler<AddFormValues> = (data) => {
    if (loading) return;
    const files = Array.from(data.files);
    const categories = pickCategories.map((name) => createCategoryObj(name));
    createCafe({
      variables: {
        ...data,
        categories,
        files,
      },
    });
  };

  useSeeCategoriesQuery({
    onCompleted: (data) => {
      if (!data.seeCategories) return;
      data?.seeCategories?.map((category) =>
        setCategoryList((prev) => (category ? [...prev, category.name] : prev))
      );
    },
  });
  useEffect(() => {
    if (filesWatch && filesWatch.length > 0) {
      const filesArray = Array.from(filesWatch);
      const urlsArray = filesArray.map((file) => URL.createObjectURL(file));
      setPhotosPreview((prev) => [...prev, ...urlsArray]);
    }
  }, [filesWatch]);
  const boxVariants: Variants = {
    initial: {
      x: 500,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: 'tween' },
    },
    exit: {
      x: -500,
      opacity: 0,
    },
  };
  const [photoIndex, setPhotoIndex] = useState(0);
  return (
    <Layout>
      <Wrapper>
        <CafeForm onSubmit={handleSubmit(onSubmitValid)}>
          {photosPreview && photosPreview.length > 0 ? (
            <AnimatePresence>
              <PhotosReivewRow>
                {photosPreview.map((photo, i) =>
                  i === photoIndex ? (
                    <PhotoReview
                      variants={boxVariants}
                      initial='initial'
                      animate='animate'
                      exit='exit'
                      photo={photo}
                      key={i}
                    >
                      {photoIndex > 0 && (
                        <PrevBtn
                          onClick={() =>
                            setPhotoIndex((prev) =>
                              prev === 0 ? photosPreview.length - 1 : prev - 1
                            )
                          }
                        >
                          <svg
                            fill='gray'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fillRule='evenodd'
                              d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            ></path>
                          </svg>
                        </PrevBtn>
                      )}
                      <NextBtn
                        onClick={() =>
                          setPhotoIndex((prev) =>
                            prev === photosPreview.length - 1 ? 0 : prev + 1
                          )
                        }
                      >
                        <svg
                          fill='gray'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                      </NextBtn>
                    </PhotoReview>
                  ) : null
                )}
                <SliderDots>
                  {photosPreview.map((_, i) => (
                    <SliderDot selected={photoIndex === i} />
                  ))}
                </SliderDots>
              </PhotosReivewRow>
            </AnimatePresence>
          ) : (
            <PhotoInputLabel>
              <input
                type='file'
                accept='image/*'
                {...register('files')}
                multiple
              />
              <svg
                fill='white'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </PhotoInputLabel>
          )}

          <Input
            type='text'
            placeholder='Name'
            {...register('name', { required: true })}
          />
          <Input
            type='text'
            placeholder='latitude'
            {...register('latitude', { required: true })}
          />
          <Input
            type='text'
            placeholder='longitude'
            {...register('longitude', { required: true })}
          />
          <CategoryListBox>
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
              <CategoryAddButton onClick={() => setAddCategoryModal(true)}>
                <svg
                  fill='white'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </CategoryAddButton>
            </CategoryList>
          </CategoryListBox>
          <SubmitButton type='submit' value='Create' />
          <span>{errors.result?.message}</span>
        </CafeForm>
        {addCategoryModal ? (
          <>
            <ModalBackground onClick={() => setAddCategoryModal(false)} />
            <CategoryAddModal
              onSubmit={categoryHandleSubmit(onCategorySubmitValid)}
            >
              <input
                {...categoryRegister('name', { required: true })}
                type='text'
                placeholder='Category Name'
              />
              <CategoryAddModalBtn>
                <svg
                  fill='white'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </CategoryAddModalBtn>
            </CategoryAddModal>
          </>
        ) : null}
      </Wrapper>
    </Layout>
  );
};

export default Add;
const Wrapper = styled.div`
  padding: 20px;
`;

const CafeForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CategoryListBox = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const CategoryList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const CategoryItem = styled.span<{ picked: boolean }>`
  cursor: pointer;
  padding: 7px;
  background-color: ${(props) =>
    props.picked ? props.theme.checkedColor : props.theme.pointColor};
  color: ${(props) =>
    props.picked ? props.theme.bgColor : props.theme.fontColor};
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
`;
const CategoryAddButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.theme.pointColor};
  border-radius: 50%;
`;
const ModalBackground = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
const CategoryAddModal = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background-color: white;
  width: 180px;
  height: 50px;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  input {
    width: 100%;
  }
`;
const CategoryAddModalBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.theme.pointColor};
  border-radius: 50%;
`;

const PhotoInputLabel = styled.label`
  border-radius: 10px;
  cursor: pointer;
  width: 80%;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.25);
  display: grid;
  place-content: center;
  margin-bottom: 20px;
  svg {
    width: 80px;
    height: 80px;
  }
  input {
    display: none;
  }
`;
const PhotosReivewRow = styled(motion.div)`
  width: 100%;
  position: relative;
`;
const PhotoReview = styled(motion.div)<{ photo: string }>`
  background-image: url(${(props) => props.photo});
  background-size: cover;
  background-position: center center;
  height: 200px;
  cursor: pointer;
  position: relative;
`;
const PrevBtn = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translate(0, -50%);
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
`;
const NextBtn = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
`;
const SliderDots = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SliderDot = styled.div<{ selected: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: ${(props) =>
    props.selected ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)'};
`;
