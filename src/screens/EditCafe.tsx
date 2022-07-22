import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SubmitButton from '../components/buttons/SubmitButton';
import { Input } from '../components/Input';
import Layout from '../components/Layout';
import { createCategoryObj } from '../components/sharedFunc';
import { useEditCafeMutation, useSeeCafeQuery } from '../generated/graphql';
import { boxVariants } from '../libs/animationVariant';
import { getCoords } from '../libs/getCoords';

interface EditFormValues {
  name: string;
  address: string;
  description: string;
  files: FileList;
  result: string;
}
interface CategoryAddFormValues {
  name: string;
}

export default function EditCafe() {
  const param = useParams();
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [pickCategories, setPickCategories] = useState<string[]>([]);
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [photosPreview, setPhotosPreview] = useState<string[]>([]);
  const [addressModal, setAddressModal] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [uploadFileList, setUploadFileList] = useState<FileList>();
  const { data } = useSeeCafeQuery({ variables: { cafeId: +param?.id! } });
  const [editCafeFn, { data: editCafeResult, loading }] = useEditCafeMutation({
    onCompleted: (data) => {
      if (!editCafeResult?.editCafe) return;
      const {
        editCafe: { ok, error },
      } = editCafeResult;
      if (!ok) {
        setError('result', { message: error! });
        return;
      }
    },
    update: (cache, result) => {
      if (!result.data?.editCafe.ok) return;
      const {
        data: {
          editCafe: { cafe },
        },
      } = result;
      if (cafe?.id) {
        cache.modify({
          id: `ROOT_QUERY`,
          fields: {
            seeCafes: (prev) => [cafe, ...prev],
          },
        });
        cache.modify({
          id: `Cafe:${cafe.id}`,
          fields: {
            address: () => cafe.address,
            description: () => cafe.description,
            categories: () => cafe.categories,
            files: () => cafe.photos,
          },
        });
      }
    },
  });
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    watch,
  } = useForm<EditFormValues>({
    mode: 'onChange',
    defaultValues: {
      name: data?.seeCafe?.name!,
      address: data?.seeCafe?.address!,
      description: data?.seeCafe?.description!,
    },
  });
  const filesWatch = watch('files');
  console.log(filesWatch);
  console.log(uploadFileList);
  const {
    register: categoryRegister,
    handleSubmit: categoryHandleSubmit,
    setValue: categorySetValue,
  } = useForm<CategoryAddFormValues>();
  const onValid = async (data: EditFormValues) => {
    if (loading) return;
    let coords = null;
    const files = Array.from(data.files);
    const categories = pickCategories.map((name) => createCategoryObj(name));
    if (data.address) {
      coords = await getCoords(data.address);
    }
    editCafeFn({
      variables: {
        id: +param?.id!,
        ...data,
        latitude: coords?.latitude,
        longitude: coords?.longitude,
        categories,
        files,
      },
    });
  };
  const onCategorySubmitValid = (data: CategoryAddFormValues) => {
    if (!categoryList.includes(data.name)) {
      setCategoryList((prev) => [...prev, data.name]);
      setPickCategories((prev) => [...prev, data.name]);
    } else {
      setPickCategories((prev) => [...prev, data.name]);
    }
    categorySetValue('name', '');
    setAddCategoryModal(false);
  };

  const daumPostcodeComplete = (data: Address) => {
    setValue('address', data.address);
    setAddressModal(false);
  };

  useEffect(() => {
    if (data?.seeCafe?.photos) {
      const urlArr = data.seeCafe.photos.map((photo) => photo?.url || '');
      if (urlArr && urlArr?.length > 0) setPhotosPreview(urlArr);
    }
  }, [data, setPhotosPreview]);

  useEffect(() => {
    if (data?.seeCafe?.categories) {
      for (const category of data.seeCafe.categories) {
        setCategoryList((prev) => (category ? [...prev, category.name] : prev));
        setPickCategories((prev) =>
          category ? [...prev, category.name] : prev
        );
      }
    }
  }, [data, setCategoryList]);

  useEffect(() => {
    if (filesWatch && filesWatch.length > 0) {
      if (filesWatch.length > 10) {
        alert('Can not upload file more than 10');
        return;
      }
      const filesArray = Array.from(filesWatch);
      const urlsArray = filesArray.map((file) => URL.createObjectURL(file));
      setPhotosPreview((prev) => [...prev, ...urlsArray]);
      setUploadFileList(filesWatch);
    }
  }, [filesWatch]);
  useEffect(() => {
    setValue('name', data?.seeCafe?.name!);
    setValue('address', data?.seeCafe?.address!);
    setValue('description', data?.seeCafe?.description!);
  }, [data, setValue]);
  return (
    <Layout>
      <Wrapper>
        <CafeForm onSubmit={handleSubmit(onValid)}>
          <PhotoUploadBox>
            <PhotoDeleteBtn>
              <svg
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                ></path>
              </svg>
            </PhotoDeleteBtn>
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
                      key={photo}
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
                      {photosPreview.length > 1 && (
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
                      )}
                    </PhotoReview>
                  ) : null
                )}
                {photosPreview.length > 1 && (
                  <SliderDots>
                    {photosPreview.map((_, i) => (
                      <SliderDot selected={photoIndex === i} key={i} />
                    ))}
                  </SliderDots>
                )}
              </PhotosReivewRow>
            </AnimatePresence>
            <PhotoInputLabel
              initial={{ scale: 1, opacity: 0 }}
              whileHover={{
                scale: 1,
                opacity: 1,
                transition: { duration: 0.5 },
              }}
              exit={{ scale: 1, opacity: 0 }}
            >
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
              <input
                type='file'
                accept='image/*'
                {...register('files')}
                multiple
                hidden
              />
            </PhotoInputLabel>
          </PhotoUploadBox>
          <Input type='text' placeholder='Name' {...register('name')} />
          <div style={{ position: 'relative', width: '100%' }}>
            <Input
              type='text'
              placeholder='Address'
              {...register('address')}
              onClick={() => setAddressModal(true)}
            />
            <AddressModalBtn onClick={() => setAddressModal(true)}>
              주소 찾기
            </AddressModalBtn>
          </div>
          <Input
            type='text'
            placeholder='Description'
            {...register('description')}
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
              <CategoryAddButton
                onClick={() => {
                  setAddCategoryModal(true);
                }}
              >
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
          <SubmitButton
            type='submit'
            value={loading ? 'Loading...' : 'Submit'}
          />
          <span>{errors.result?.message}</span>
        </CafeForm>
        <AnimatePresence>
          {addCategoryModal ? (
            <>
              <ModalBackground
                onClick={() => setAddCategoryModal(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { type: 'tween' } }}
                exit={{ opacity: 0 }}
              />
              <CategoryAddModal
                onSubmit={categoryHandleSubmit(onCategorySubmitValid)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: { type: 'tween' },
                }}
                exit={{ scale: 0, opacity: 0 }}
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

          {addressModal ? (
            <>
              <ModalBackground
                onClick={() => setAddressModal(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { type: 'tween' } }}
                exit={{ opacity: 0 }}
              />
              <AddressModal
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: { type: 'tween' },
                }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <DaumPostcodeEmbed onComplete={daumPostcodeComplete} />
              </AddressModal>
            </>
          ) : null}
        </AnimatePresence>
      </Wrapper>
    </Layout>
  );
}
const Wrapper = styled.div`
  padding: 0 10px;
`;
const CafeForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
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
const ModalBackground = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;
const CategoryAddModal = styled(motion.form)`
  position: absolute;
  top: 45%;
  left: 0;
  right: 0;
  margin: auto auto;
  border-radius: 20px;
  background-color: white;
  width: 180px;
  height: 50px;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  z-index: 101;
  input {
    width: 100%;
    padding: 5px;
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

const PhotoInputLabel = styled(motion.label)`
  border-radius: 50%;
  cursor: pointer;
  width: 120px;
  height: 120px;
  background-color: rgba(255, 255, 255, 0.5);
  input {
    display: tnone;
  }
  position: absolute;
`;
const PhotosReivewRow = styled(motion.div)`
  width: 100%;
  position: relative;
  margin-bottom: 10px;
`;
const PhotoReview = styled(motion.div)<{ photo: string }>`
  border-radius: 10px;
  background-image: url(${(props) => props.photo});
  background-size: cover;
  background-position: center center;
  height: 200px;
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
  z-index: 999;
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
  z-index: 999;
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
const AddressModal = styled(motion.div)`
  position: absolute;
  top: 200px;
  width: 350px;
  z-index: 999;
`;

const AddressModalBtn = styled.div`
  position: absolute;
  top: 15px;
  right: 0;
  cursor: pointer;
  padding: 7px;
  background-color: ${(props) => props.theme.pointColor};
  color: ${(props) => props.theme.fontColor};
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
`;
const PhotoDeleteBtn = styled.div`
  cursor: pointer;
  z-index: 100;
  position: absolute;
  left: 10px;
  top: 10px;
  svg {
    stroke: ${(props) => props.theme.red};
    width: 20px;
    height: 20px;
  }
`;

const PhotoUploadBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
