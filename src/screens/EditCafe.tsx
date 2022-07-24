// Edit Cafe Page
// - [ ] category list duplicate rendering bug fix
// - [ ] Showing Error to user

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import RedButton from '../components/buttons/RedButton';
import SubmitButton from '../components/buttons/SubmitButton';
import { Input } from '../components/Input';
import Layout from '../components/Layout';
import PhotoUPloadBox from '../components/PhotoUploadBox';
import { createCategoryObj } from '../libs/sharedFunc';
import {
  useDeleteCafeMutation,
  useEditCafeMutation,
  useSeeCafeQuery,
} from '../generated/graphql';
import { getCoords } from '../libs/getCoords';
import { IPhotoObjArr, UpdateCafeFormValues } from '../types';

interface CategoryAddFormValues {
  name: string;
}

export default function EditCafe() {
  const param = useParams();
  const navigate = useNavigate();
  //state
  const [photosPreview, setPhotosPreview] = useState<IPhotoObjArr[]>([]);
  const [addressModal, setAddressModal] = useState(false);
  const [deleteIds, setDeleteIds] = useState<number[]>([]);
  const [uploadFileList, setUploadFileList] = useState<
    Array<File> | null | undefined
  >(null);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [pickCategories, setPickCategories] = useState<string[]>([]);
  const [addCategoryModal, setAddCategoryModal] = useState(false);

  // fetching
  const { data } = useSeeCafeQuery({
    variables: { cafeId: +param.id?.toString()! },
  });
  //
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
      if (cafe) {
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

  // Delete Cafe Fn

  const [deleteCafeFn, { loading: deleteLoading }] = useDeleteCafeMutation({
    onCompleted: (data) => {
      if (!data.deleteCafe) return;
      const {
        deleteCafe: { ok, error },
      } = data;
      if (!ok) {
        setError('result', { message: error! });
        return;
      }
      navigate('/');
    },
    update: (cache, result) => {
      if (!result.data?.deleteCafe) return;
      const {
        data: {
          deleteCafe: { ok, id },
        },
      } = result;
      if (ok) {
        cache.modify({
          id: `ROOT_QUERY`,
          fields: {
            seeCafes: (prev) => {
              const result = prev.filter((r: { __ref: string; id: number }) => {
                if (r.__ref) {
                  return !r['__ref']?.includes(id + '');
                }
                if (r.id) {
                  return r.id !== id;
                }
                return result;
              });
            },
          },
        });
      }
    },
  });

  // Edit form
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    watch,
  } = useForm<UpdateCafeFormValues>({
    mode: 'onChange',
    defaultValues: {
      name: data?.seeCafe?.name!,
      address: data?.seeCafe?.address!,
      description: data?.seeCafe?.description!,
    },
  });

  // upload file tracking
  const filesWatch = watch('files');

  // Category form
  const {
    register: categoryRegister,
    handleSubmit: categoryHandleSubmit,
    setValue: categorySetValue,
  } = useForm<CategoryAddFormValues>();
  const onValid = async (data: UpdateCafeFormValues) => {
    if (loading) return;

    let coords = null;
    let files = null;

    if (uploadFileList && uploadFileList.length > 0) {
      files = uploadFileList;
    }
    // category : {name:string, slug:string}
    const categories = pickCategories.map((name) => createCategoryObj(name));

    // addrees
    if (data.address) {
      coords = await getCoords(data.address);
    }

    // Update Trigger Fn`
    editCafeFn({
      variables: {
        id: +param?.id!,
        ...data,
        latitude: coords?.latitude,
        longitude: coords?.longitude,
        ...(categories && { categories }),
        ...(files && { files }),
        ...(deleteIds?.length > 0 && { deleteIds }),
      },
    });
  };

  // category submit valid
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

  const onClickDeleteCafe = () => {
    deleteCafeFn({
      variables: { id: data?.seeCafe?.id || +param.id?.toString()! },
    });
  };

  // Cafe Photos Mounting
  useEffect(() => {
    if (data?.seeCafe?.photos) {
      const photoObjArr = data.seeCafe.photos.map((photo) => ({
        id: photo?.id,
        url: photo?.url,
      }));
      if (photoObjArr?.length > 0) setPhotosPreview(photoObjArr);
    }
  }, [data, setPhotosPreview]);

  // Cafe Categories Mounting
  useEffect(() => {
    if (data?.seeCafe?.categories) {
      const prevCategoriesNameArray = data.seeCafe.categories.map((category) =>
        category ? category.name : ''
      );
      setCategoryList(prevCategoriesNameArray);
      setPickCategories(prevCategoriesNameArray);
    }
  }, [data, setCategoryList]);

  // cafe upload photo file setting
  useEffect(() => {
    if (filesWatch && filesWatch.length > 0) {
      if (filesWatch.length > 10) {
        alert('Can not upload file more than 10');
        return;
      }
      const filesArray = Array.from(filesWatch);
      const urlsArray = filesArray.map((file) => ({
        url: URL.createObjectURL(file),
        key: file.lastModified,
      }));
      setPhotosPreview((prev) => [...prev, ...urlsArray]);
      setUploadFileList(filesArray);
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
          <PhotoUPloadBox
            photosPreview={photosPreview}
            setPhotosPreview={setPhotosPreview}
            setDeleteIds={setDeleteIds}
            setUploadFileList={setUploadFileList}
            register={register}
          />
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
                  key={name + i}
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
            value={loading || deleteLoading ? 'Loading...' : 'Upadte'}
          />
          <span>{errors.result?.message}</span>
        </CafeForm>
        <RedButton onClick={onClickDeleteCafe}>Delete Cafe</RedButton>

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
                <DaumPostcodeEmbed
                  onComplete={(data: Address) => {
                    setValue('address', data.address);
                    setAddressModal(false);
                  }}
                />
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
const CafeForm = styled.form``;

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
  color: ${(props) => (props.picked ? props.theme.white : props.theme.black)};
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
    color: ${(props) => props.theme.black};
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
