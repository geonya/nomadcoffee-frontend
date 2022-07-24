import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SubmitButton from '../components/buttons/SubmitButton';
import { Input } from '../components/Input';
import Layout from '../components/Layout';
import { createCategoryObj } from '../libs/sharedFunc';
import {
  useCreateCafeMutation,
  useSeeCategoriesQuery,
} from '../generated/graphql';
import { routes } from '../routes';
import { AnimatePresence, motion } from 'framer-motion';
import DaumPostcodeEmbed, { type Address } from 'react-daum-postcode';
import { getCoords } from '../libs/getCoords';
import { IPhotoObjArr, UpdateCafeFormValues } from '../types';
import PhotoUPloadBox from '../components/PhotoUploadBox';
import FormError from '../components/FormError';

interface CategoryAddFormValues {
  name: string;
}

const Add = () => {
  const navigation = useNavigate();

  // state
  const [photosPreview, setPhotosPreview] = useState<IPhotoObjArr[]>([]);
  const [addressModal, setAddressModal] = useState(false);
  const [uploadFileList, setUploadFileList] = useState<
    Array<File> | null | undefined
  >(null);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [pickCategories, setPickCategories] = useState<string[]>([]);
  const [addCategoryModal, setAddCategoryModal] = useState(false);

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

  useSeeCategoriesQuery({
    onCompleted: (data) => {
      if (!data.seeCategories) return;
      data?.seeCategories?.map((category) =>
        setCategoryList((prev) => (category ? [...prev, category.name] : prev))
      );
    },
  });

  // Add Cafe form
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, dirtyFields },
    watch,
  } = useForm<UpdateCafeFormValues>({ mode: 'onChange' });
  // upload file tracking
  const filesWatch = watch('files');

  // category react hook form
  const {
    register: categoryRegister,
    handleSubmit: categoryHandleSubmit,
    setValue: categorySetValue,
    formState: { errors: categoryErrors },
  } = useForm<CategoryAddFormValues>({
    mode: 'onChange',
  });
  const categoryInputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...categoryRest } = categoryRegister('name', {
    required: true,
    minLength: { value: 2, message: '2자 이상 입력해주세요.' },
  });

  const onValid = async (data: UpdateCafeFormValues) => {
    if (loading) return;

    let coords = null;
    let files = null;

    if (uploadFileList && uploadFileList.length > 0) {
      files = uploadFileList;
    }

    // category : {name:string, slug:string}
    const categories = pickCategories.map((name) => createCategoryObj(name));

    // address
    if (data.address) {
      coords = await getCoords(data.address);
    }

    // Create cafe trigger Fn
    createCafe({
      variables: {
        ...data,
        latitude: coords?.latitude,
        longitude: coords?.longitude,
        categories,
        files,
      },
    });
  };

  // category submit valid
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

  // category input auto focusing
  useEffect(() => {
    if (categoryInputRef.current && addCategoryModal) {
      categoryInputRef.current.focus();
    }
  }, [addCategoryModal, categoryInputRef]);

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
        // for identifying file on preview and deleting
        key: file.lastModified,
      }));
      setPhotosPreview((prev) => [...prev, ...urlsArray]);
      setUploadFileList(Array.from(filesArray));
    }
  }, [filesWatch]);

  // address input showing modal when focusing
  useEffect(() => {
    if (dirtyFields.address) {
      setAddressModal(true);
      dirtyFields.address = false;
    }
  }, [dirtyFields, dirtyFields.address]);

  return (
    <Layout>
      <Wrapper>
        <AnimatePresence>
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
        <CafeForm onSubmit={handleSubmit(onValid)}>
          <PhotoUPloadBox
            photosPreview={photosPreview}
            setPhotosPreview={setPhotosPreview}
            setUploadFileList={setUploadFileList}
            register={register}
          />
          <Input
            type='text'
            placeholder='Name'
            {...register('name', {
              required: true,
              minLength: { value: 2, message: '2자 이상 입력해주세요.' },
            })}
          />
          <FormError message={errors.name?.message} />
          <div style={{ position: 'relative', width: '100%' }}>
            <Input
              type='text'
              placeholder='Address'
              {...register('address')}
              onClick={() => setAddressModal(true)}
            />
            <FormError message={errors.address?.message} />
            <AddressModalBtn onClick={() => setAddressModal(true)}>
              주소 찾기
            </AddressModalBtn>
          </div>
          <Input
            type='text'
            placeholder='Description'
            {...register('description', {
              required: true,
              minLength: { value: 2, message: '2자 이상 입력해주세요.' },
            })}
          />
          <FormError message={errors.description?.message} />
          <CategoryListBox>
            <CategoryList>
              {categoryList.map((name, i) => (
                <CategoryItem
                  key={name}
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
          <SubmitButton type='submit' value={loading ? 'Loading...' : 'Add'} />
          <FormError message={errors.result?.message} />
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
                <div>
                  <input
                    {...categoryRest}
                    name='name'
                    ref={(e) => {
                      ref(e);
                      categoryInputRef.current = e;
                    }}
                    type='text'
                    placeholder='Category Name'
                  />
                  <FormError message={categoryErrors.name?.message} />
                </div>
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
        </AnimatePresence>
      </Wrapper>
    </Layout>
  );
};

export default Add;

// css

const Wrapper = styled.div`
  padding: 20px;
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
    color: ${(props) => props.theme.black};
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
