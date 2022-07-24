import { motion } from 'framer-motion';
import { Dispatch, useState } from 'react';
import { type UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { boxVariants } from '../libs/animationVariant';
import { IPhotoObjArr, UpdateCafeFormValues } from '../types';

interface PhotoUPloadBoxProps {
  photosPreview: IPhotoObjArr[];
  setPhotosPreview: Dispatch<React.SetStateAction<IPhotoObjArr[]>>;
  register: UseFormRegister<UpdateCafeFormValues>;
  setUploadFileList?: Dispatch<
    React.SetStateAction<Array<File> | null | undefined>
  >;
  setDeleteIds?: Dispatch<React.SetStateAction<number[]>>;
}

export default function PhotoUPloadBox({
  photosPreview,
  setPhotosPreview,
  setUploadFileList,
  setDeleteIds,
  register,
}: PhotoUPloadBoxProps) {
  //Showing Photo in Slider with Index
  const [photoIndex, setPhotoIndex] = useState(0);

  const onPhotoDelete = (i: number, id?: number, key?: number) => {
    setPhotosPreview((prev) => [
      ...prev.slice(0, i),
      ...prev.slice(i + 1, prev.length),
    ]);
    if (setUploadFileList && key) {
      setUploadFileList((prev) =>
        prev?.filter((file) => file.lastModified !== key)
      );
    }
    if (setDeleteIds && id) {
      setDeleteIds((prev) => [...prev, id]);
    }
  };
  const makeUploadBox = (photosPreview: IPhotoObjArr[]) => {
    const PhotosArr = photosPreview.map((obj, i) => (
      <PhotoReview
        variants={boxVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        photo={obj.url!}
        key={i}
      >
        <PhotoDeleteBtn onClick={() => onPhotoDelete(i, obj.id, obj.key)}>
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
      </PhotoReview>
    ));

    const addBtnBox = (
      <PhotoInputContainer
        variants={boxVariants}
        initial='initial'
        animate='animate'
        exit='exit'
      >
        <PhotoInputLabel
          initial={{ scale: 1, opacity: 0.6 }}
          whileHover={{ scale: 1.1, opacity: 0.8 }}
          exit={{ scale: 1, opacity: 0.6 }}
        >
          <motion.svg
            fill='white'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
              clipRule='evenodd'
            ></path>
          </motion.svg>
          <input
            type='file'
            accept='image/*'
            {...register('files')}
            multiple
            hidden
          />
        </PhotoInputLabel>
      </PhotoInputContainer>
    );
    const addBtnArr = [...PhotosArr, addBtnBox];
    return addBtnArr[photoIndex];
  };

  return (
    <Container>
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
      {photosPreview.length > 0 && (
        <NextBtn
          onClick={() => {
            setPhotoIndex((prev) =>
              prev === photosPreview.length ? 0 : prev + 1
            );
          }}
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
      {photosPreview.length > 1 && (
        <SliderDots>
          {photosPreview.map((_, i) => (
            <SliderDot selected={photoIndex === i} key={i} />
          ))}
        </SliderDots>
      )}
      {makeUploadBox(photosPreview)}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  margin-bottom: 10px;
`;

const PhotoInputContainer = styled(motion.div)`
  cursor: pointer;
  width: 100%;
  height: 200px;
  background-color: ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 10px;
  input {
    display: tnone;
  }
`;
const PhotoInputLabel = styled(motion.label)`
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.checkedColor};
  svg {
    fill: ${(props) => props.theme.white};
    width: 80px;
    height: 80px;
  }
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
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  z-index: 999;
  cursor: pointer;
`;
const NextBtn = styled.div`
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.8);
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
  z-index: 999;
`;
const SliderDot = styled.div<{ selected: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: ${(props) =>
    props.selected ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)'};
  z-index: 999;
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
